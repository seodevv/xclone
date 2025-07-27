import { AdvancedUser, SafeUser, UserId } from './User';

export interface AdvancedRooms {
  status?: 'temp';
  id: string;
  receiverid: string;
  Receiver: SafeUser;
  senderid: string;
  Sender: SafeUser;
  createat: Date;
  lastmessageid: number | null;
  lastmessagesenderid: string | null;
  type: 'gif' | 'image' | null;
  content: string | null;
  lastat: Date | null;
  sent: { id: AdvancedUser['id']; count: number }[];
  Disabled: UserId[];
}

export type RoomsNotifications = {
  id: AdvancedRooms['id'];
  Notifications: number;
};
