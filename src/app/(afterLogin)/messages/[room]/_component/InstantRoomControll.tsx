'use client';

import useGetRoom from '@/app/(afterLogin)/messages/_hooks/useGetRoom';
import useRoomsQueryData from '@/app/(afterLogin)/messages/_hooks/useRoomsQueryData';
import { useLayoutEffect } from 'react';

interface Props {
  sessionId: string;
  roomid: string;
}

export default function InstantRoomControll({ sessionId, roomid }: Props) {
  const { data: room } = useGetRoom(roomid);
  const { addRoom } = useRoomsQueryData({ sessionId });

  useLayoutEffect(() => {
    if (typeof room !== 'undefined') {
      addRoom({ payload: room.data });
    }
  }, [room]);

  return null;
}
