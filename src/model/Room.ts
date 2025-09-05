import { AdvancedUser, SafeUser, UserId } from './User';

export interface Snooze {
  type: '1h' | '8h' | '1w' | 'forever';
  createat: string;
}

export interface AdvancedRooms {
  status?: 'temp';
  id: string;
  receiverid: string;
  Receiver: SafeUser;
  senderid: string;
  Sender: SafeUser;
  createat: string;
  lastmessageid: number | null;
  lastmessagesenderid: string | null;
  type: 'gif' | 'image' | null;
  content: string | null;
  lastat: string | null;
  sent: { id: AdvancedUser['id']; count: number }[];
  Disabled: boolean;
  Pinned: boolean;
  Snooze: Snooze | null;
}

export type RoomsNotifications = {
  id: AdvancedRooms['id'];
  Notifications: number;
};
