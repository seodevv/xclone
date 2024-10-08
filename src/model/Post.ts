import { PostImage } from './PostImage';
import { SafeUser, UserId } from './User';

export interface Post {
  postId: number;
  userId: string;
  content: string;
  images: PostImage[];
  createAt: string;
  parentId?: Post['postId'];
  originalId?: Post['postId'];
  quote?: boolean;
  pinned?: boolean;
  scope?: 'every' | 'follow' | 'verified' | 'only';
}

export interface AdvancedPost extends Post {
  User: SafeUser;
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
  Parent?: {
    postId: Post['postId'];
    User: SafeUser;
    images: PostImage[];
  };
  Original?: AdvancedPost;
}
