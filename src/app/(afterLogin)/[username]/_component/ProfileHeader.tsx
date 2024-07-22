import style from '@/app/(afterLogin)/[username]/_style/profile.module.css';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getUser } from '../_lib/getUser';
import { getUserPostsCount } from '../_lib/getUserPostsCount';
import ProfileHeaderContent from './ProfileHeaderContent';
import BackButton from '@/app/(afterLogin)/_component/buttons/BackButton';

interface Props {
  username: string;
}

export default async function ProfileHeader({ username }: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  });
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['users', username],
      queryFn: getUser,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }),
    queryClient.prefetchQuery({
      queryKey: ['posts', 'count', username, { filter: 'all' }],
      queryFn: getUserPostsCount,
    }),
  ]);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <div className={style.header}>
        <BackButton />
        <ProfileHeaderContent username={username} />
      </div>
    </HydrationBoundary>
  );
}
