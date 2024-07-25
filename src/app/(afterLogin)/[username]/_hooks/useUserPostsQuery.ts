import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getUserPosts } from '../_lib/getUserPosts';

interface Params {
  username: string;
  filter?: 'all' | 'reply' | 'media' | 'like';
}

export const useUserPostsQuery = ({ username, filter = 'all' }: Params) =>
  useSuspenseInfiniteQuery({
    queryKey: ['posts', 'list', username, { filter }],
    queryFn: getUserPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
