import { useQuery } from '@tanstack/react-query';
import { getTrends } from '../_lib/getTrends';

export const useTrendsQuery = () =>
  useQuery({
    queryKey: ['hashtags', 'list'],
    queryFn: getTrends,
  });
