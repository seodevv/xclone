import getListsSearch from '@/app/(afterLogin)/i/lists/search/_lib/getListsSearch';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  searchParams: { q?: string };
  children: React.ReactNode;
}

export default async function ListsSearchHydrationBoundary({
  searchParams,
  children,
}: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  });
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['lists', 'list', 'search', searchParams],
    queryFn: getListsSearch,
    initialPageParam: 0,
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
