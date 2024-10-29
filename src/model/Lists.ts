import { SafeUser, UserId } from '@/model/User';

export interface AdvancedLists {
  id: number;
  userid: string;
  name: string;
  description: string | null;
  banner: string;
  thumbnail: string;
  make: 'private' | 'public';
  createat: string;
  User: SafeUser;
  Member: UserId[];
  Follower: UserId[];
  UnShow: UserId[];
  Posts: number[];
  Pinned: boolean;
}

export interface ListsDetail {
  id: number;
  listid: number;
  type: 'member' | 'post' | 'unpost' | 'follower' | 'pinned' | 'unshow';
  userid: string;
  postid: number | null;
}
