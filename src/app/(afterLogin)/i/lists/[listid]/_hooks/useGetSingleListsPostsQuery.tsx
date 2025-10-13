import getSingleListsPosts from '@/app/(afterLogin)/i/lists/[listid]/_lib/getSingleLIstsPosts';
import { useInfiniteQuery } from '@tanstack/react-query';

const useGetSingleListsPostsQuery = (listid: string) =>
  useInfiniteQuery({
    queryKey: ['posts', 'list', 'lists', listid],
    queryFn: getSingleListsPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

export default useGetSingleListsPostsQuery;
