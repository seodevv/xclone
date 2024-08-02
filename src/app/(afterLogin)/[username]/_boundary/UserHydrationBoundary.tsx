import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getUserPosts } from '../_lib/getUserPosts';
import { getFollowRecommends } from '../../_lib/getFollowRecommends';

interface Props {
  children: React.ReactNode;
  username: string;
  filter: 'all' | 'reply' | 'media';
}

export default async function UserHydrationBoundary({
  children,
  username,
  filter,
}: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: { staleTime: 1 * 60 * 1000 },
  });
  Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ['posts', 'list', username, { filter }],
      queryFn: getUserPosts,
      initialPageParam: 0,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['users', 'list', 'recommends'],
      queryFn: getFollowRecommends,
      initialPageParam: 0,
    }),
  ]);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
