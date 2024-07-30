import { useInfiniteQuery } from '@tanstack/react-query';
import { getLikePosts } from '../_lib/getLikePosts';

export const useLikePostsQuery = () =>
  useInfiniteQuery({
    queryKey: ['posts', 'list', 'likes'],
    queryFn: getLikePosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
