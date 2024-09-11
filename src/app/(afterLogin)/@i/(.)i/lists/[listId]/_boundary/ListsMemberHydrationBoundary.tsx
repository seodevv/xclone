import getListsMember from '@/app/(afterLogin)/@i/(.)i/lists/[listId]/_lib/getListsMember';
import getSingleLists from '@/app/(afterLogin)/i/lists/[listId]/_lib/getSingleLists';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  listId: string;
  filter: 'members' | 'followers';
  children?: React.ReactNode;
}

export default async function ListsMemberHydrationBoundary({
  listId,
  filter,
  children,
}: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  });
  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ['users', 'list', 'lists', listId, { filter }],
      queryFn: getListsMember,
      initialPageParam: '',
    }),
    queryClient.prefetchQuery({
      queryKey: ['lists', listId],
      queryFn: getSingleLists,
    }),
  ]);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
