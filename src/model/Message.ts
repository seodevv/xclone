import { AdvancedUser, SafeUser, UserId } from './User';

export interface AdvancedMessages {
  id: number;
  parentid: number | null;
  Parent: AdvancedMessages | null;
  roomid: string;
  senderid: string;
  content: string;
  createat: string;
  Sender: SafeUser;
  status?: 'sending' | 'failed';
  seen: boolean;
  Disable: UserId[];
  React: {
    id: AdvancedUser['id'];
    nickname: AdvancedUser['nickname'];
    image: AdvancedUser['image'];
    verified: AdvancedUser['verified'];
    content: string;
  }[];
  Media: {
    id: number;
    type: 'gif' | 'image';
    url: string;
    width: number;
    height: number;
    filename?: string;
  } | null;
}
