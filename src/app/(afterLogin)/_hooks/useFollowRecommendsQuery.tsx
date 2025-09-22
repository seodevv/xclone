import { useInfiniteQuery } from '@tanstack/react-query';
import { getFollowRecommends } from '../_lib/getFollowRecommends';
import { useSelectedLayoutSegment } from 'next/navigation';

export const useFollowRecommendsQuery = (creator?: boolean) => {
  const segment = useSelectedLayoutSegment();
  const queryKey: string[] = ['users', 'list', 'recommends'];
  if (typeof creator !== 'undefined' && creator) {
    queryKey.push('creator');
  }
  const query = useInfiniteQuery({
    queryKey,
    queryFn: getFollowRecommends,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: segment !== 'message',
  });
  return query;
};
