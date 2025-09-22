'use client';

import getListsMember from '@/app/(afterLogin)/@i/(.)i/lists/[listid]/_lib/getListsMember';
import { useInfiniteQuery } from '@tanstack/react-query';

interface Params {
  listid: string;
  filter: 'members' | 'followers';
}

const useGetListsMemberQuery = ({ listid, filter }: Params) =>
  useInfiniteQuery({
    queryKey: ['users', 'list', 'lists', listid, { filter }],
    queryFn: getListsMember,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

export default useGetListsMemberQuery;
