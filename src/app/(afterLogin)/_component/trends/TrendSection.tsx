import { getServerSession } from 'next-auth';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getTrends } from '@/app/(afterLogin)/_lib/getTrends';
import Trends from '@/app/(afterLogin)/_component/trends/Trends';

export default async function TrendSection() {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['hashtags', 'list'],
    queryFn: getTrends,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <Trends />
    </HydrationBoundary>
  );
}
