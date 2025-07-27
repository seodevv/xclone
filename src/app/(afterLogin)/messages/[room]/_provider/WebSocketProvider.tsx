'use client';

import useMessagesQueryData from '@/app/(afterLogin)/messages/[room]/_hooks/useMessagesQueryData';
import { MessagesScrollContext } from '@/app/(afterLogin)/messages/[room]/_provider/MessagesScrollProvider';
import useRoomsQueryData from '@/app/(afterLogin)/messages/_hooks/useRoomsQueryData';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { generateStringToNumberHash } from '@/app/_lib/common';
import { AdvancedMessages } from '@/model/Message';
import {
  ClientToServerEvents,
  MessageMediaData,
  ServerToClientEvents,
} from '@/model/socket';
import { SafeUser } from '@/model/User';
import { FirstArgument } from '@/model/Utils';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type Send = {
  type: 'new';
  message: Pick<AdvancedMessages, 'roomid' | 'Sender' | 'content' | 'parentid'>;
  media: MessageMediaData | null;
};
type Retry = {
  type: 'retry';
  message: Pick<
    AdvancedMessages,
    'id' | 'roomid' | 'Sender' | 'content' | 'parentid'
  >;
  media: MessageMediaData | null;
};
type EmitMessageArgs = Send | Retry;
type EmitReactionArgs = Required<
  FirstArgument<ClientToServerEvents['reaction']>
> & {
  session: SafeUser;
};

interface Status {
  flag: 'idle' | 'new';
  count: number;
}

const initialContext = {
  status: {
    flag: 'idle' as const,
    count: 0,
  },
  sendMessage: (): Promise<void> => new Promise((res) => res()),
  sendReaction: (): Promise<void> => new Promise((res) => res()),
};

export const WebSocketContext = createContext<{
  status: Status;
  sendMessage: (
    data: EmitMessageArgs,
    fn?: (err?: Error, data?: AdvancedMessages) => void
  ) => Promise<void>;
  sendReaction: (
    data: EmitReactionArgs,
    fn?: (err?: Error, data?: AdvancedMessages) => void
  ) => Promise<void>;
}>(initialContext);

interface CustomSocket
  extends Socket<ServerToClientEvents, ClientToServerEvents> {
  data?: {
    sessionId: string;
  };
}

interface Props {
  children: React.ReactNode;
  sessionId: string;
}

export default function WebSocketProvider({ children, sessionId }: Props) {
  const { alterMessage } = useAlterModal();
  const { info, setScroll } = useContext(MessagesScrollContext);
  const { updateRooms, updateRoomNotifications } = useRoomsQueryData({
    sessionId,
  });
  const { getMessage, addMessage, updateMessage } = useMessagesQueryData({
    sessionId,
  });
  const [socket] = useState<CustomSocket>(
    io(`${process.env.NEXT_PUBLIC_SERVER_URL}/messages`, {
      autoConnect: false,
      auth: {
        sessionId,
      },
    })
  );
  const [status, setStatus] = useState<Status>(initialContext.status);

  const processRef = useRef(false);
  function connectSocket(): Promise<CustomSocket> {
    return new Promise((resolve, reject) => {
      if (socket.connected) return socket;
      processRef.current = true;

      socket.on('connect', () => {
        console.log(`[socket-connected][${socket.id}] socket connected`);
        processRef.current = false;
        resolve(socket);
      });
      socket.on('connect_error', (err) => {
        console.log(`[socket-error]][${socket.id}] socket connected error`);
        processRef.current = false;
        reject(err);
      });
      socket.on('disconnect', () => {
        console.log(`[socket-disconnected]][${socket.id}] socket disconnected`);
      });
      socket.on('reaction', ({ message }) => {
        if (typeof message !== 'undefined') {
          updateMessage({
            roomId: message.roomid,
            target: {
              messageId: message.id,
              status: undefined,
              payload: {
                React: message.React,
              },
            },
          });
        }
      });

      socket.connect();
    });
  }

  async function disconnectSocket() {
    if (socket.connected) {
      socket.close();
    }
  }

  function messageEvent({
    room,
    message,
  }: Parameters<ServerToClientEvents['message']>[0]) {
    const pathname = window.location.pathname;

    if (typeof message !== 'undefined') {
      addMessage({ payload: message });

      if (typeof room !== 'undefined') {
        const isActive = pathname.includes(room.id);
        updateRooms({
          target: {
            id: room.id,
            payload: {
              ...room,
              sent: isActive
                ? room.sent.map((u) => {
                    if (u.id === message.senderid) {
                      return {
                        id: u.id,
                        count: 0,
                      };
                    }
                    return u;
                  })
                : room.sent,
            },
          },
        });

        if (!isActive) {
          updateRoomNotifications({
            type: 'add',
            roomid: room.id,
          });
        }

        if (info.position === 'bottom') {
          setScroll('bottom');
        }
      }
    }
    setStatus((prev) => ({ ...prev, flag: 'new', count: prev.count + 1 }));
  }

  async function sendMessage(
    { type, message, media }: EmitMessageArgs,
    fn?: (err?: Error, data?: AdvancedMessages) => void
  ) {
    const uniqueId = generateStringToNumberHash(
      `${message.roomid}-${new Date().getTime()}`
    );
    const newMessage: AdvancedMessages = {
      id: uniqueId,
      parentid: message.parentid,
      Parent: null,
      roomid: message.roomid,
      senderid: message.Sender.id,
      Sender: message.Sender,
      content: message.content,
      createat: new Date().toISOString(),
      seen: false,
      Disable: [],
      React: [],
      Media: media
        ? {
            id: -1,
            type: media.type,
            url: media.url,
            width: media.width,
            height: media.height,
            filename: media.type === 'image' ? media.filename : undefined,
          }
        : null,
    };
    if (type === 'new') {
      addMessage({
        payload: {
          ...newMessage,
          status: 'sending',
        },
      });
    }

    if (navigator.onLine) {
      await socket.timeout(1000).emit(
        'message',
        {
          roomid: message.roomid,
          senderid: message.Sender.id,
          content: message.content,
          parentid: message.parentid,
          media,
        },
        (err, data?: AdvancedMessages) => {
          if (err) {
            console.error(err);
            updateMessage({
              roomId: message.roomid,
              target: {
                messageId: type === 'new' ? uniqueId : message.id,
                status: 'failed',
              },
            });
            if (typeof fn === 'function') {
              fn(err);
            }
          } else if (typeof data !== 'undefined') {
            updateMessage({
              roomId: data.roomid,
              target: {
                messageId: type === 'new' ? uniqueId : message.id,
                status: undefined,
                payload: data,
              },
            });
            updateRooms({
              target: {
                id: data.roomid,
                payload: {
                  lastmessageid: data.id,
                  type: data.Media ? data.Media.type : null,
                  content: data.content,
                  lastat: new Date(data.createat),
                },
              },
            });
          }
          if (typeof fn === 'function') {
            fn(undefined, data);
          }
        }
      );
    } else {
      alterMessage('Please check your network status.', 'error');
      updateMessage({
        roomId: message.roomid,
        target: {
          messageId: uniqueId,
          status: 'failed',
        },
      });
    }
  }

  async function sendReaction({
    type,
    roomid,
    messageid,
    content,
    session,
  }: EmitReactionArgs) {
    const message = getMessage({ roomid, messageid });
    if (typeof message === 'undefined') return;

    const checkOfReact = !!message.React.find((r) => r.id === session.id);
    updateMessage({
      roomId: roomid,
      target: {
        messageId: message.id,
        status: undefined,
        payload: {
          React:
            type === 'add'
              ? checkOfReact
                ? message.React.map((r) =>
                    r.id === session.id ? { ...r, content } : r
                  )
                : [
                    ...message.React,
                    {
                      ...session,
                      content,
                    },
                  ]
              : message.React.filter((r) => r.id !== session.id),
        },
      },
    });

    function updateReact({
      roomid,
      messageid,
      React,
    }: {
      roomid: AdvancedMessages['roomid'];
      messageid: AdvancedMessages['id'];
      React: AdvancedMessages['React'];
    }) {
      updateMessage({
        roomId: roomid,
        target: {
          messageId: messageid,
          status: undefined,
          payload: {
            React: React,
          },
        },
      });
    }

    if (navigator.onLine) {
      await socket
        .timeout(1000)
        .emit(
          'reaction',
          { type, roomid, messageid, content },
          (err, updatedMessage) => {
            if (err) {
              console.error(err);
              updateReact({
                roomid,
                messageid: message.id,
                React: message.React,
              });
            } else {
              // console.log('[updatedMessage]\n', updatedMessage);
            }
          }
        );
    } else {
      alterMessage('Please check your network status.', 'error');
      updateMessage({
        roomId: roomid,
        target: {
          messageId: message.id,
          status: undefined,
          payload: {
            React: message.React,
          },
        },
      });
    }
  }

  useEffect(() => {
    if (!processRef.current) {
      connectSocket();
    }
    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    socket.on('message', messageEvent);
    return () => {
      socket.off('message', messageEvent);
    };
  }, [socket, info]);

  return (
    <WebSocketContext.Provider value={{ status, sendMessage, sendReaction }}>
      {children}
    </WebSocketContext.Provider>
  );
}
