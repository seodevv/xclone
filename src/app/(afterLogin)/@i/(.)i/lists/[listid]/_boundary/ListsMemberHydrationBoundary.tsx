import getListsMember from '@/app/(afterLogin)/@i/(.)i/lists/[listid]/_lib/getListsMember';
import getSingleLists from '@/app/(afterLogin)/i/lists/[listid]/_lib/getSingleLists';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  listid: string;
  filter: 'members' | 'followers';
  children?: React.ReactNode;
}

export default async function ListsMemberHydrationBoundary({
  listid,
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
      queryKey: ['users', 'list', 'lists', listid, { filter }],
      queryFn: getListsMember,
      initialPageParam: 0,
    }),
    queryClient.prefetchQuery({
      queryKey: ['lists', listid],
      queryFn: getSingleLists,
    }),
  ]);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
