import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getFollowRecommends } from '@/app/(afterLogin)/_lib/getFollowRecommends';
import FollowRecommends from '@/app/(afterLogin)/_component/follow_recommends/FollowRecommends';

export default async function FollowRecommendsSection() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['users', 'list', 'recommends'],
    queryFn: getFollowRecommends,
    staleTime: 5 * 1000 * 60,
    gcTime: 10 * 1000 * 60,
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydrateState}>
        <FollowRecommends />
      </HydrationBoundary>
    </>
  );
}
