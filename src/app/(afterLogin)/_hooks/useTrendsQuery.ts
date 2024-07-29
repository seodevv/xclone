import { useQuery } from '@tanstack/react-query';
import { getTrends } from '../_lib/getTrends';

export const useTrendsQuery = (segment: string | null) =>
  useQuery({
    queryKey: ['hashtags', 'list'],
    queryFn: getTrends,
    enabled: segment !== 'explore',
  });
