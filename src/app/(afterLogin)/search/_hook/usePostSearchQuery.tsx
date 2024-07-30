'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostSearch } from '../../_lib/getPostSearch';

interface Params {
  searchParams: { q?: string; f?: string; pf?: string; lf?: string };
}

export const usePostSearchQuery = ({ searchParams }: Params) => {
  const enabled = searchParams.f !== 'user';
  const query = useInfiniteQuery({
    queryKey: ['posts', 'list', 'search', searchParams],
    queryFn: getPostSearch,
    initialPageParam: 0,
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
