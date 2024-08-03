'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getFollowList } from '../_lib/getFollowList';

interface Params {
  username: string;
  type: 'verified_followers' | 'follow' | 'following';
}

export const useUserFollowListQuery = ({ username, type }: Params) => {
  const query = useInfiniteQuery({
    queryKey: ['users', 'list', username, { type }],
    queryFn: getFollowList,
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  return { ...query, isEmpty: query.data?.pages[0].data?.length === 0 };
};
