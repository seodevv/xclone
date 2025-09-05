import { getMessagesSearch } from '@/app/(afterLogin)/messages/_lib/getMessagesSearch';
import { AdvancedMessages } from '@/model/Message';
import { useInfiniteQuery } from '@tanstack/react-query';

interface Params {
  query: AdvancedMessages['content'];
  enabled?: boolean;
}

const useGetMessagesSearch = ({ query, enabled }: Params) =>
  useInfiniteQuery({
    queryKey: ['messages', 'list', 'search', query],
    queryFn: getMessagesSearch,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled,
  });

export default useGetMessagesSearch;
