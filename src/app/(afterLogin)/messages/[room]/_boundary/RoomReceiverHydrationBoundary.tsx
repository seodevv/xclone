import { getUser } from '@/app/(afterLogin)/[username]/_lib/getUser';
import { decryptRoomId } from '@/app/_lib/common';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  children?: React.ReactNode;
  sessionid: string;
  roomid: string;
}

export default async function RoomReceiverHydrationBoundary({
  children,
  sessionid,
  roomid,
}: Props) {
  const receiverId = decryptRoomId({ userId: sessionid, roomId: roomid });
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  });
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['users', receiverId],
      queryFn: getUser,
    }),
  ]);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
