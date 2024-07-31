import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getUserPosts } from '../_lib/getUserPosts';

interface Props {
  children: React.ReactNode;
  username: string;
  filter: 'all' | 'reply' | 'media';
}

export default async function UserPostHydartionBoundary({
  children,
  username,
  filter,
}: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts', 'list', username, { filter }],
    queryFn: getUserPosts,
    initialPageParam: 0,
    staleTime: 1 * 60 * 1000,
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
