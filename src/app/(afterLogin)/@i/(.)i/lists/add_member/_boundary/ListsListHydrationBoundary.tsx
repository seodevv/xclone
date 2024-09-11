import getListsRecommends from '@/app/(afterLogin)/@i/(.)i/lists/add_member/_lib/getListsRecommends';
import getUserLists from '@/app/(afterLogin)/@i/(.)i/lists/add_member/_lib/getUserLists';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  username: string;
  filter: 'own' | 'all' | 'memberships';
  children?: React.ReactNode;
}

export default async function UserListsHydrationBoundary({
  username,
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
      queryKey: ['lists', 'list', username, { filter }],
      queryFn: getUserLists,
      initialPageParam: 0,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['lists', 'list', 'recommends'],
      queryFn: getListsRecommends,
      initialPageParam: 0,
    }),
  ]);

  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
