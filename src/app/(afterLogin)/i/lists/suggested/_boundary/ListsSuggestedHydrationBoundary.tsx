import getListsRecommends from '@/app/(afterLogin)/@i/(.)i/lists/add_member/_lib/getListsRecommends';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  children: React.ReactNode;
}

export default async function ListsSuggestedHydrationBoundary({
  children,
}: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  });
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['lists', 'list', 'recommends'],
    queryFn: getListsRecommends,
    initialPageParam: 0,
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
