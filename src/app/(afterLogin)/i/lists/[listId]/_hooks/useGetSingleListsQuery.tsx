'use client';

import getSingleLists from '@/app/(afterLogin)/i/lists/[listId]/_lib/getSingleLists';
import { useQuery } from '@tanstack/react-query';

const useGetSingleListsQuery = (listId: string) =>
  useQuery({
    queryKey: ['lists', listId],
    queryFn: getSingleLists,
  });

export default useGetSingleListsQuery;
