import { getRoomMessages } from '@/app/(afterLogin)/messages/[room]/_lib/getRoomMessages';
import { useInfiniteQuery } from '@tanstack/react-query';

interface Params {
  sessionId: string;
  roomId: string;
}

const useGetRoomMessages = ({ sessionId, roomId }: Params) =>
  useInfiniteQuery({
    queryKey: ['messages', 'list', sessionId, roomId],
    queryFn: getRoomMessages,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
  });

export default useGetRoomMessages;
