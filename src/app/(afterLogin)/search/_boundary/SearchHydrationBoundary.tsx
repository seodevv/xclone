import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getUserSearch } from '../../_lib/getUserSearch';
import { getPostSearch } from '../../_lib/getPostSearch';
import getListsSearch from '@/app/(afterLogin)/i/lists/search/_lib/getListsSearch';

interface Props {
  children: React.ReactNode;
  searchParams: { q?: string; f?: string; pf?: string; lf?: string };
}

export default function SearchHydrationBoundary({
  children,
  searchParams,
}: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: { staleTime: 1 * 60 * 1000 },
  });
  Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ['posts', 'list', 'search', searchParams],
      queryFn: getPostSearch,
      initialPageParam: 0,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['users', 'list', 'search', searchParams],
      queryFn: getUserSearch,
      initialPageParam: 0,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['lists', 'list', 'search', searchParams],
      queryFn: getListsSearch,
      initialPageParam: 0,
    }),
  ]);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
