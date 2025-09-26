'use client';

import useGetRoomMessages from '@/app/(afterLogin)/messages/[room]/_lib/useGetRoomMessages';
import { useContext, useLayoutEffect, useRef, useState } from 'react';
import PageLoading from '@/app/(afterLogin)/_component/loading/PageLoading';
import RoomMessage from '@/app/(afterLogin)/messages/[room]/_component/_body/_messages/RoomMessage';
import { MessagesScrollContext } from '@/app/(afterLogin)/messages/[room]/_provider/MessagesScrollProvider';

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

  const messages = data?.pages.map((page) => page.data).flat();
  const lastSeenIndex = messages?.findLastIndex(
    (message) =>
      message.senderid === sessionId &&
      message.seen &&
      !message.Disable.find((u) => u.id === sessionId)
  );
  const lastSentIndex = messages?.findLastIndex(
    (message) =>
      message.senderid === sessionId &&
      !message.seen &&
      !message.Disable.find((u) => u.id === sessionId)
  );

  const prevHeightRef = useRef(9);
  const { scrollRef } = useContext(MessagesScrollContext);
  useLayoutEffect(() => {
    if (isFetchingPreviousPage) {
      if (scrollRef?.current) {
        prevHeightRef.current = scrollRef.current.scrollHeight;
      }
    } else {
      if (scrollRef?.current) {
        const newHeight = scrollRef.current.scrollHeight;
        scrollRef.current.scrollTop = newHeight - prevHeightRef.current;
      }
    }
  }, [isFetchingPreviousPage]);

  if (typeof data === 'undefined') return null;

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
      {messages?.map((message, index) => {
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
