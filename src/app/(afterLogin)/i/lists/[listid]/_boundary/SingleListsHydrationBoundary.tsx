import getSingleLists from '@/app/(afterLogin)/i/lists/[listid]/_lib/getSingleLists';
import getSingleListsPosts from '@/app/(afterLogin)/i/lists/[listid]/_lib/getSingleLIstsPosts';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  listid: string;
  children?: React.ReactNode;
}

export default async function SingleListsHydartionBoundary({
  listid,
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
      queryKey: ['lists', listid],
      queryFn: getSingleLists,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['posts', 'list', 'lists', listid],
      queryFn: getSingleListsPosts,
      initialPageParam: 0,
    }),
  ]);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
