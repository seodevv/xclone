import { getMessagesSearch } from '@/app/(afterLogin)/messages/_lib/getMessagesSearch';
import { AdvancedMessages } from '@/model/Message';
import { useInfiniteQuery } from '@tanstack/react-query';

interface Params {
  q: AdvancedMessages['content'];
  enabled?: boolean;
}

const useGetMessagesSearch = ({ q, enabled }: Params) =>
  useInfiniteQuery({
    queryKey: ['messages', 'list', 'search', q],
    queryFn: getMessagesSearch,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled,
  });

export default useGetMessagesSearch;
