import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getTrends } from '../_lib/getTrends';

export const useTrendsQuery = () =>
  useInfiniteQuery({
    queryKey: ['hashtags', 'list'],
    queryFn: getTrends,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
