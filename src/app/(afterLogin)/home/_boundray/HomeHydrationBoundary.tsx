import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getPostRecommends } from '../_lib/getPostRecommends';
import { getPostFollowings } from '../_lib/getPostFollowings';

interface Props {
  children: React.ReactNode;
}

export default async function HomeHydrationBoundary({ children }: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      staleTime: 1 * 60 * 1000,
    },
  });
  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ['posts', 'list', 'recommends', { filter: 'all' as const }],
      queryFn: getPostRecommends,
      initialPageParam: 0,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['posts', 'list', 'followings'],
      queryFn: getPostFollowings,
      initialPageParam: 0,
    }),
  ]);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
