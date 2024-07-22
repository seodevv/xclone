import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import UserPosts from '../_component/UserPosts';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getUserPosts } from '../_lib/getUserPosts';

interface Props {
  params: { username: string };
}

export default async function MediaPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'list', params.username, { filter: 'media' }],
    queryFn: getUserPosts,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <UserPosts session={session} username={params.username} filter="media" />
    </HydrationBoundary>
  );
}
