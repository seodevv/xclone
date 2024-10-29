export type Birth = {
  date: string;
  scope: {
    month: 'public' | 'follower' | 'following' | 'each' | 'only';
    year: 'public' | 'follower' | 'following' | 'each' | 'only';
  };
};

export type Verified = {
  type: 'blue' | 'gold' | 'gray';
  date: Date;
};

export interface UserId {
  id: AdvancedUser['id'];
}

export interface AdvancedUser {
  id: string;
  nickname: string;
  image: string;
  banner: string | null;
  desc: string | null;
  location: string | null;
  birth: Birth | null;
  verified: Verified | null;
  refer: string | null;
  regist: string;
  Followers: UserId[];
  Followings: UserId[];
  _count: {
    Followers: number;
    Followings: number;
  };
}

export interface SafeUser
  extends Pick<AdvancedUser, 'id' | 'nickname' | 'image' | 'verified'> {}
