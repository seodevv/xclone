import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getFollowRecommends } from '../_lib/getFollowRecommends';

interface Props {
  is_creator_only?: string;
  children: React.ReactNode;
}

export default async function FollowRecommendsHydrationBoundary({
  is_creator_only,
  children,
}: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: { staleTime: 1 * 60 * 1000 },
  });
  const queryKey: string[] = ['users', 'list', 'recommends'];
  if (typeof is_creator_only !== 'undefined') {
    queryKey.push('creator');
  }
  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn: getFollowRecommends,
    initialPageParam: '',
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
