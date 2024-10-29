import { SafeUser } from './User';

export interface AdvancedMessages {
  id: number;
  roomid: string;
  senderid: string;
  content: string;
  createat: Date;
  Sender: SafeUser;
}
