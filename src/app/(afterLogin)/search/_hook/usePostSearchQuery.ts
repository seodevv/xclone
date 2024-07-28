'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostSearch } from '../../_lib/getPostSearch';

interface Params {
  searchParams: { q?: string; f?: string; pf?: string; lf?: string };
}

export const usePostSearchQuery = ({ searchParams }: Params) =>
  useInfiniteQuery({
    queryKey: ['posts', 'list', 'search', searchParams],
    queryFn: getPostSearch,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
