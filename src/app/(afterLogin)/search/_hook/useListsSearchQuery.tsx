import getListsSearch from '@/app/(afterLogin)/i/lists/search/_lib/getListsSearch';
import { useInfiniteQuery } from '@tanstack/react-query';

interface QueryParams {
  searchParams: { q?: string; f?: string; pf?: string; lf?: string };
}

export const useListsSearchQuery = ({ searchParams }: QueryParams) => {
  const { f } = searchParams;
  const enabled = f === 'lists';

  return useInfiniteQuery({
    queryKey: ['lists', 'list', 'search', searchParams],
    queryFn: getListsSearch,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled,
  });
};
