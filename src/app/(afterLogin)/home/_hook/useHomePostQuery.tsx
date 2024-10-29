import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getPostRecommends } from '../_lib/getPostRecommends';
import { getPostFollowings } from '../_lib/getPostFollowings';

export const useHomePostQuery = (type: 'recommends' | 'followings') => {
  const queryKey: (string | { filter: 'all' | 'media' })[] = [
    'posts',
    'list',
    type,
  ];
  if (type === 'recommends') {
    queryKey.push({ filter: 'all' });
  }
  const query = useSuspenseInfiniteQuery({
    queryKey,
    queryFn: type === 'recommends' ? getPostRecommends : getPostFollowings,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
  return query;
};
