'use client';

import getUserLists from '@/app/(afterLogin)/@i/(.)i/lists/add_member/_lib/getUserLists';
import { useInfiniteQuery } from '@tanstack/react-query';

interface Params {
  username: string;
  filter: 'own' | 'all' | 'memberships';
}

const useGetUserListsQuery = ({ username, filter }: Params) =>
  useInfiniteQuery({
    queryKey: ['lists', 'list', username, { filter }],
    queryFn: getUserLists,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

export default useGetUserListsQuery;
