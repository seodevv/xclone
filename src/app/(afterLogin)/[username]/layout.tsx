import style from './userLayout.module.css';
import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import UserProfile from './_component/_profile/UserProfile';
import UserTabs from './_component/UserTabs';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getUser } from './_lib/getUser';
import { getUserPostsCount } from './_lib/getUserPostsCount';
import UserHeader from './_component/_header/UserHeader';

interface Props {
  children: ReactNode;
  params: { username: string };
}

export default async function layout({ children, params }: Props) {
  const session = await getServerSession(authOptions);
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['users', params.username],
      queryFn: getUser,
      staleTime: 1 * 60 * 1000,
    }),
    queryClient.prefetchQuery({
      queryKey: ['posts', 'count', params.username, { filter: 'all' }],
      queryFn: getUserPostsCount,
    }),
  ]);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <main className={style.main}>
        <UserHeader username={params.username} />
        <section>
          <UserProfile session={session} username={params.username} />
          <UserTabs session={session} username={params.username} />
          {children}
        </section>
      </main>
    </HydrationBoundary>
  );
}
