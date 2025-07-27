// send event(emit)

import { AdvancedMessages } from '@/model/Message';
import { AdvancedRooms } from '@/model/Room';

// Server to Client
export interface ServerToClientEvents {
  message: (data: { room?: AdvancedRooms; message?: AdvancedMessages }) => void;
  reaction: (data: { message?: AdvancedMessages }) => void;
}

// Client to Server
export interface ClientToServerEvents {
  message: (
    data: {
      roomid: AdvancedMessages['roomid'];
      senderid: AdvancedMessages['senderid'];
      content: AdvancedMessages['content'];
      parentid: AdvancedMessages['parentid'];
      media: MessageMediaData | null;
    },
    callback: (data: AdvancedMessages | undefined) => void
  ) => void;
  reaction: (
    data: {
      type: 'add' | 'undo';
      roomid: AdvancedMessages['roomid'];
      messageid: AdvancedMessages['id'];
      content?: AdvancedMessages['React'][0]['content'];
    },
    callback: (data: AdvancedMessages | undefined) => void
  ) => void;
}

interface Gif {
  type: 'gif';
  url: string;
  width: number;
  height: number;
}

interface Image {
  type: 'image';
  url: string;
  width: number;
  height: number;
  file: File;
  filename: string;
}

export type MessageMediaData = Gif | Image;
