import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import UserPosts from './_component/UserPosts';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getUserPosts } from './_lib/getUserPosts';

interface Props {
  params: { username: string };
}

export default async function ProfilePage({ params }: Props) {
  const session = await getServerSession(authOptions);
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  });
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'list', params.username, { filter: 'all' }],
    queryFn: getUserPosts,
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <UserPosts session={session} username={params.username} />
    </HydrationBoundary>
  );
}
