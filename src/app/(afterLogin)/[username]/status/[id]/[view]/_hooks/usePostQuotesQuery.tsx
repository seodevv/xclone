import getPostQuotes from '@/app/(afterLogin)/[username]/status/[id]/[view]/_lib/getPostQuotes';
import { useInfiniteQuery } from '@tanstack/react-query';

interface Params {
  id: string;
  username: string;
  view: 'quotes';
}

const usePostQuotesQuery = ({ id, username, view }: Params) =>
  useInfiniteQuery({
    queryKey: ['posts', 'list', 'quotes', id, { username, filter: view }],
    queryFn: getPostQuotes,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

export default usePostQuotesQuery;
