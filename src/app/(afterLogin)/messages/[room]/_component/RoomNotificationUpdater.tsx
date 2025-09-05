'use client';

import { WebSocketContext } from '@/app/(afterLogin)/messages/[room]/_provider/WebSocketProvider';
import useRoomsQueryData from '@/app/(afterLogin)/messages/_hooks/useRoomsQueryData';
import { useContext, useEffect, useRef } from 'react';

interface Props {
  sessionid: string;
  roomid: string;
}

export default function RoomNotificationUpdater({ sessionid, roomid }: Props) {
  const { updateNotification, updateRoomNotifications } = useRoomsQueryData({
    sessionId: sessionid,
  });
  const { sendFocus } = useContext(WebSocketContext);
  const onceRef = useRef<boolean>(false);

  useEffect(() => {
    if (!onceRef.current) {
      sendFocus({ roomid });
      updateNotification({ roomid });
      updateRoomNotifications({ type: 'remove', roomid });
      onceRef.current = true;
    }
  }, []);

  return null;
}
