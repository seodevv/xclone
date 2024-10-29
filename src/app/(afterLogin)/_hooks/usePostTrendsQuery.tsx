'use client';

import { getPostRecommends } from '@/app/(afterLogin)/home/_lib/getPostRecommends';
import { useInfiniteQuery } from '@tanstack/react-query';

export const usePostTrendsQuery = (filter: 'all' | 'media') =>
  useInfiniteQuery({
    queryKey: ['posts', 'list', 'recommends', { filter }],
    queryFn: getPostRecommends,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
