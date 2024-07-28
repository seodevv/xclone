'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getUserSearch } from '../../_lib/getUserSearch';

interface Params {
  searchParams: { q?: string; f?: string; pf?: string; lf?: string };
  enabled?: boolean;
}

export const useUserSearchQuery = ({ searchParams, enabled }: Params) =>
  useInfiniteQuery({
    queryKey: ['users', 'list', 'search', searchParams],
    queryFn: getUserSearch,
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled,
  });
