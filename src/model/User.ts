interface Verified {
  type: 'blue' | 'gold' | 'gray';
  date: string;
}

export interface User {
  id: string;
  password: string;
  nickname: string;
  image: string;
  banner?: string;
  desc?: string;
  refer?: string;
  verified?: Verified;
  regist: string;
}

export interface UserId {
  id: User['id'];
}

export interface SafeUser extends Pick<User, 'id' | 'nickname' | 'image'> {}
export interface AdvancedUser extends Omit<User, 'password'> {
  Followers: UserId[];
  _count: {
    Followers: number;
    Followings: number;
  };
}
