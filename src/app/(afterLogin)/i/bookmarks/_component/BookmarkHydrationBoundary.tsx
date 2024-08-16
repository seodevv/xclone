import getBookmarks from '@/app/(afterLogin)/i/bookmarks/_lib/getBookmarks';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  children: React.ReactNode;
}

export default async function BookmarkHydrationBoundary({ children }: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  });
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts', 'list', 'bookmarks'],
    queryFn: getBookmarks,
    initialPageParam: 0,
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
