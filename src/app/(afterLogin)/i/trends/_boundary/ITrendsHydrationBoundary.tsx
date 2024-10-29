import { getFollowRecommends } from '@/app/(afterLogin)/_lib/getFollowRecommends';
import { getTrends } from '@/app/(afterLogin)/_lib/getTrends';
import { getPostRecommends } from '@/app/(afterLogin)/home/_lib/getPostRecommends';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  children: React.ReactNode;
}

export default async function ITrendsHydrationBoundary({ children }: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  });
  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ['hashtags', 'list'],
      queryFn: getTrends,
      initialPageParam: 0,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['posts', 'list', 'recommends', { filter: 'all' as const }],
      queryFn: getPostRecommends,
      initialPageParam: 0,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['posts', 'list', 'recommends', { filter: 'media' as const }],
      queryFn: getPostRecommends,
      initialPageParam: 0,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['users', 'list', 'recommends'],
      queryFn: getFollowRecommends,
      initialPageParam: '',
    }),
  ]);

  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
