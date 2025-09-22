'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getUserSearch } from '../../_lib/getUserSearch';

interface Params {
  searchParams: { q?: string; f?: string; pf?: string; lf?: string };
}

export const useUserSearchQuery = ({ searchParams }: Params) => {
  const { f } = searchParams;
  const enabled = typeof f === 'undefined' || f === 'user';

  return useInfiniteQuery({
    queryKey: ['users', 'list', 'search', searchParams],
    queryFn: getUserSearch,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled,
  });
};
