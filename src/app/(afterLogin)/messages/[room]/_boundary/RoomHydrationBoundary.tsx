import { getRoomMessages } from '@/app/(afterLogin)/messages/[room]/_lib/getRoomMessages';
import { getRoom } from '@/app/(afterLogin)/messages/_lib/getRoom';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  children?: React.ReactNode;
  sessionId: string;
  roomId: string;
}

export default async function RoomHydrationBoundary({
  children,
  sessionId,
  roomId,
}: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  });
  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ['messages', 'list', sessionId, roomId],
      queryFn: getRoomMessages,
      initialPageParam: 0,
    }),
    queryClient.prefetchQuery({
      queryKey: ['rooms', roomId],
      queryFn: getRoom,
    }),
  ]);
  const dehydrationState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrationState}>{children}</HydrationBoundary>
  );
}
