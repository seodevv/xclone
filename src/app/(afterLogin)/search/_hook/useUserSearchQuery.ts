'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getUserSearch } from '../../_lib/getUserSearch';

interface Params {
  searchParams: { q?: string; f?: string; pf?: string; lf?: string };
}

export const useUserSearchQuery = ({ searchParams }: Params) => {
  const enabled =
    typeof searchParams.f === 'undefined' || searchParams.f === 'user';
  const query = useInfiniteQuery({
    queryKey: ['users', 'list', 'search', searchParams],
    queryFn: getUserSearch,
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled,
  });

  if (!query.data && query.isError) {
    throw query.error;
  }

  return {
    ...query,
    isEmpty: query.data?.pages.at(0)?.data.length === 0,
    enabled,
  };
};
