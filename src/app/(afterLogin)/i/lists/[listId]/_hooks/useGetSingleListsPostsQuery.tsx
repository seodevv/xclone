import getSingleListsPosts from '@/app/(afterLogin)/i/lists/[listId]/_lib/getSingleLIstsPosts';
import { useInfiniteQuery } from '@tanstack/react-query';

const useGetSingleListsPostsQuery = (listId: string) =>
  useInfiniteQuery({
    queryKey: ['posts', 'list', 'lists', listId],
    queryFn: getSingleListsPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

export default useGetSingleListsPostsQuery;
