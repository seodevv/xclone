import { useInfiniteQuery } from '@tanstack/react-query';
import { getComments } from '../_lib/getComments';

export const useCommentsInfiniteQuery = (id: string) =>
  useInfiniteQuery({
    queryKey: ['posts', 'list', 'comments', id],
    queryFn: getComments,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
