'use client';

import useGetRoomMessages from '@/app/(afterLogin)/messages/[room]/_lib/useGetRoomMessages';
import { useState } from 'react';
import PageLoading from '@/app/(afterLogin)/_component/loading/PageLoading';
import RoomMessage from '@/app/(afterLogin)/messages/[room]/_component/_body/_messages/RoomMessage';

interface Props {
  sessionId: string;
  roomId: string;
}

export default function RoomMessages({ sessionId, roomId }: Props) {
  const {
    data,
    hasPreviousPage,
    isFetchingPreviousPage,
    isError,
    fetchPreviousPage,
    refetch,
  } = useGetRoomMessages({ sessionId, roomId });
  const [selected, setSelected] = useState(-1);

  if (typeof data === 'undefined') return null;

  const messages = data.pages.map((page) => page.data).flat();
  const lastSeenIndex = messages.findLastIndex(
    (message) =>
      message.senderid === sessionId &&
      message.seen &&
      !message.Disable.find((u) => u.id === sessionId)
  );
  const lastSentIndex = messages.findLastIndex(
    (message) =>
      message.senderid === sessionId &&
      !message.seen &&
      !message.Disable.find((u) => u.id === sessionId)
  );

  return (
    <>
      <PageLoading
        type="previous"
        hasPreviousPage={hasPreviousPage}
        isFetchingPreviousPage={isFetchingPreviousPage}
        isError={isError}
        fetchPreviousPage={fetchPreviousPage}
        refetch={refetch}
      />
      {messages.map((message, index) => {
        const nextMessage = messages[index + 1];
        const present =
          typeof nextMessage !== 'undefined'
            ? new Date(message.createat.substring(0, 16)).getTime() ===
                new Date(nextMessage.createat.substring(0, 16)).getTime() &&
              !nextMessage.Disable.find((u) => u.id === sessionId)
              ? false
              : true
            : true;
        const disabled = message.Disable.find((u) => u.id === sessionId);
        if (typeof disabled !== 'undefined') return null;

        return (
          <RoomMessage
            key={message.id}
            sessionId={sessionId}
            message={message}
            date={{
              present,
              lastSeen: index === lastSeenIndex,
              lastSent: index === lastSentIndex,
              selected: selected === index,
            }}
            onClick={() => {
              if (sessionId !== message.senderid) return;
              if (selected === index) {
                setSelected(-1);
              } else {
                setSelected(index);
              }
            }}
          />
        );
      })}
    </>
  );
}
