'use client';

import useRoomNotificationMutation from '@/app/(afterLogin)/messages/[room]/_hooks/useRoomNotificationMutation';
import useRoomsQueryData from '@/app/(afterLogin)/messages/_hooks/useRoomsQueryData';
import { useEffect, useRef } from 'react';

interface Props {
  sessionid: string;
  roomid: string;
}

export default function RoomNotificationUpdater({ sessionid, roomid }: Props) {
  const { mutate: notificationUpdate } = useRoomNotificationMutation(sessionid);
  const { updateRoomNotifications } = useRoomsQueryData({
    sessionId: sessionid,
  });
  const onceRef = useRef<boolean>(false);

  useEffect(() => {
    if (!onceRef.current) {
      notificationUpdate({ roomid });
      updateRoomNotifications({ type: 'remove', roomid });
      onceRef.current = true;
    }
  }, [notificationUpdate]);

  return null;
}
