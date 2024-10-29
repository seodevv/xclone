import { SafeUser } from './User';

export interface AdvancedRooms {
  id: string;
  receiverid: string;
  senderid: string;
  createat: Date;
  lastmessageid: number | null;
  Receiver: SafeUser;
  Sender: SafeUser;
  content: string | null;
  lastat: Date | null;
}
