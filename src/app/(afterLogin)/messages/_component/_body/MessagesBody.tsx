'use client';

import MessagesSearch from '@/app/(afterLogin)/messages/_component/_body/MessagesSearch';
import NoMessages from '@/app/(afterLogin)/messages/_component/NoMessages';
import useGetRooms from '@/app/(afterLogin)/messages/_hooks/useGetRooms';
import MessagesRoom from '@/app/(afterLogin)/messages/_component/_body/MessagesRoom';

interface Props {
  sessionId: string;
}

export default function MessagesBody({ sessionId }: Props) {
  const { data: rooms } = useGetRooms(sessionId);

  if (typeof rooms !== 'undefined' && rooms.data.length !== 0) {
    return (
      <div>
        <MessagesSearch />
        {rooms.data
          .sort((a, b) =>
            a.status === 'temp' || a.createat > b.createat ? -1 : 1
          )
          .map((room) => (
            <MessagesRoom key={room.id} room={room} sessionId={sessionId} />
          ))}
      </div>
    );
  }

  return (
    <div>
      <NoMessages />
    </div>
  );
}
