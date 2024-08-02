import { useInfiniteQuery } from '@tanstack/react-query';
import { getFollowRecommends } from '../_lib/getFollowRecommends';
import { useSelectedLayoutSegment } from 'next/navigation';

export const useFollowRecommendsQuery = () => {
  const segment = useSelectedLayoutSegment();
  const query = useInfiniteQuery({
    queryKey: ['users', 'list', 'recommends'],
    queryFn: getFollowRecommends,
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: segment !== 'message',
  });
  return query;
};
