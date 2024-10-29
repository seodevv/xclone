import { getPostRecommends } from '@/app/(afterLogin)/home/_lib/getPostRecommends';
import { useInfiniteQuery } from '@tanstack/react-query';

export const usePostMediaRecommendsQuery = () =>
  useInfiniteQuery({
    queryKey: ['posts', 'list', 'recommends', { filter: 'media' as const }],
    queryFn: getPostRecommends,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
