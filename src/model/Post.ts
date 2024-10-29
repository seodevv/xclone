import { SafeUser, UserId } from './User';

export interface AdvancedPost {
  postid: number;
  userid: string;
  content: string;
  images: PostImage[];
  createat: string;
  parentid: number | null;
  originalid: number | null;
  quote: boolean;
  pinned: boolean;
  scope: 'every' | 'follow' | 'verified' | 'only';
  User: SafeUser;
  Parent: {
    postid: number;
    User: SafeUser;
    images: PostImage[];
  } | null;
  Original: AdvancedPost | null;
  Hearts: UserId[];
  Reposts: UserId[];
  Comments: UserId[];
  Bookmarks: UserId[];
  _count: {
    Hearts: number;
    Reposts: number;
    Comments: number;
    Bookmarks: number;
    Views: number;
  };
}

export interface PostImage {
  link: string;
  imageId: number;
  width: number;
  height: number;
}
