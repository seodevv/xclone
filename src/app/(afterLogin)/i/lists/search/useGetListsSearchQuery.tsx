import getListsSearch from '@/app/(afterLogin)/i/lists/search/_lib/getListsSearch';
import { useInfiniteQuery } from '@tanstack/react-query';

interface QueryParams {
  q?: string;
}

const useGetListsSearchQuery = (searchParams: QueryParams) =>
  useInfiniteQuery({
    queryKey: ['lists', 'list', 'search', searchParams],
    queryFn: getListsSearch,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

export default useGetListsSearchQuery;
