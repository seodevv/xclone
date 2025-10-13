'use client';

import getSingleLists from '@/app/(afterLogin)/i/lists/[listid]/_lib/getSingleLists';
import { useQuery } from '@tanstack/react-query';

const useGetSingleListsQuery = (listid: string) =>
  useQuery({
    queryKey: ['lists', listid],
    queryFn: getSingleLists,
  });

export default useGetSingleListsQuery;
