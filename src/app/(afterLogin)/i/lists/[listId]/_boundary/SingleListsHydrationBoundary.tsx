import getSingleLists from '@/app/(afterLogin)/i/lists/[listId]/_lib/getSingleLists';
import getSingleListsPosts from '@/app/(afterLogin)/i/lists/[listId]/_lib/getSingleLIstsPosts';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  listId: string;
  children?: React.ReactNode;
}

export default async function SingleListsHydartionBoundary({
  listId,
  children,
}: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  });
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['lists', listId],
      queryFn: getSingleLists,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['posts', 'list', 'lists', listId],
      queryFn: getSingleListsPosts,
      initialPageParam: 0,
    }),
  ]);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
