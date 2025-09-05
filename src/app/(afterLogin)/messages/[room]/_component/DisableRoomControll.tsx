'use client';

import useGetRoom from '@/app/(afterLogin)/messages/_hooks/useGetRoom';
import useRoomsQueryData from '@/app/(afterLogin)/messages/_hooks/useRoomsQueryData';
import { useLayoutEffect, useRef } from 'react';

interface Props {
  sessionId: string;
  roomid: string;
}

export default function DisableRoomControll({ sessionId, roomid }: Props) {
  const { data: room } = useGetRoom(roomid);
  const { updateRoom } = useRoomsQueryData({ sessionId });
  const firstMount = useRef(true);

  useLayoutEffect(() => {
    if (firstMount.current) {
      if (room?.data.Disabled) {
        updateRoom({
          target: {
            id: roomid,
            payload: {
              Disabled: false,
            },
          },
        });
      }
      firstMount.current = false;
    }
  }, [room]);

  return null;
}
