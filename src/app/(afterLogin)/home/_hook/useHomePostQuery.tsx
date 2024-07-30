import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getPostRecommends } from '../_lib/getPostRecommends';
import { getPostFollowings } from '../_lib/getPostFollowings';

export const useHomePostQuery = (type: 'recommends' | 'followings') =>
  useSuspenseInfiniteQuery({
    queryKey: ['posts', 'list', type],
    queryFn: type === 'recommends' ? getPostRecommends : getPostFollowings,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
