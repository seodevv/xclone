'use client';

import getListsMember from '@/app/(afterLogin)/@i/(.)i/lists/[listId]/_lib/getListsMember';
import { useInfiniteQuery } from '@tanstack/react-query';

interface Params {
  listId: string;
  filter: 'members' | 'followers';
}

const useGetListsMemberQuery = ({ listId, filter }: Params) =>
  useInfiniteQuery({
    queryKey: ['users', 'list', 'lists', listId, { filter }],
    queryFn: getListsMember,
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

export default useGetListsMemberQuery;
