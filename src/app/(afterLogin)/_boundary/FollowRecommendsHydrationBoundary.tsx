import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getFollowRecommends } from '../_lib/getFollowRecommends';

interface Props {
  children: React.ReactNode;
}

export default async function FollowRecommendsHydrationBoundary({
  children,
}: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: { staleTime: 1 * 60 * 1000 },
  });
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['users', 'list', 'recommends'],
    queryFn: getFollowRecommends,
    initialPageParam: '',
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
