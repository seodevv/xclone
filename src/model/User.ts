export interface Verified {
  type: 'blue' | 'gold' | 'gray';
  date: string;
}

export interface Birth {
  date: string;
  scope: {
    month: 'public' | 'follower' | 'following' | 'each' | 'only';
    year: 'public' | 'follower' | 'following' | 'each' | 'only';
  };
}
export interface User {
  id: string;
  password: string;
  nickname: string;
  image: string;
  banner?: string;
  desc?: string;
  birth?: Birth;
  location?: string;
  refer?: string;
  verified?: Verified;
  regist: string;
}

export interface UserId {
  id: User['id'];
}

export interface SafeUser
  extends Pick<User, 'id' | 'nickname' | 'image' | 'verified'> {}
export interface AdvancedUser extends Omit<User, 'password'> {
  Followers: UserId[];
  Followings: UserId[];
  _count: {
    Followers: number;
    Followings: number;
  };
}
