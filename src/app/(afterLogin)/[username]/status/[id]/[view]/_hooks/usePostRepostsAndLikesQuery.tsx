import getPostRepostAndLikes from '@/app/(afterLogin)/[username]/status/[id]/[view]/_lib/getPostRepostAndLikes';
import { useInfiniteQuery } from '@tanstack/react-query';

interface Params {
  username: string;
  id: string;
  view: 'retweets' | 'likes';
}

const usePostRepostsAndLikesQuery = ({ username, id, view }: Params) =>
  useInfiniteQuery({
    queryKey: ['users', 'list', view, { username, postid: id }],
    queryFn: getPostRepostAndLikes,
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

export default usePostRepostsAndLikesQuery;
