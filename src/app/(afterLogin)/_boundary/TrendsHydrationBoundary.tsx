import { ReactNode } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getTrends } from '../_lib/getTrends';

interface Props {
  children: ReactNode;
}

export default async function TrendsHydrationBoundary({ children }: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['hashtags', 'list'],
    queryFn: getTrends,
    staleTime: 1 * 60 * 1000,
    initialPageParam: 0,
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
