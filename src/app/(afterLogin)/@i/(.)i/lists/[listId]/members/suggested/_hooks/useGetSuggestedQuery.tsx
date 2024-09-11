import { getUserSearch } from '@/app/(afterLogin)/_lib/getUserSearch';
import { useInfiniteQuery } from '@tanstack/react-query';

interface QueryParams {
  searchParams: { q?: string; f?: string; pf?: string; lf?: string };
  enabled?: boolean;
}

const useGetSuggestedQuery = ({ searchParams, enabled }: QueryParams) =>
  useInfiniteQuery({
    queryKey: ['users', 'list', 'search', searchParams],
    queryFn: getUserSearch,
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled,
  });

export default useGetSuggestedQuery;
