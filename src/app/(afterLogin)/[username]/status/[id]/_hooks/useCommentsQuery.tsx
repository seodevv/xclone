import { useInfiniteQuery } from '@tanstack/react-query';
import { getComments } from '../_lib/getComments';

interface Params {
  username: string;
  id: string;
}

export const useCommentsInfiniteQuery = ({ username, id }: Params) =>
  useInfiniteQuery({
    queryKey: ['posts', 'list', 'comments', id, { username }],
    queryFn: getComments,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
