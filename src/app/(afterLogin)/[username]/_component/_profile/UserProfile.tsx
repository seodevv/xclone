'use client';

import styles from './userProfile.module.css';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Session } from 'next-auth';
import { useUserQuery } from '../../_hooks/useUserQuery';
import UserFollowInfo from './UserFollowInfo';
import UserSince from './UserSince';
import UserDesc from './UserDesc';
import UserBanner from './UserBanner';
import UserImage from './UserImage';
import UserIdentifier from './UserIdentifier';

interface Props {
  session: Session | null;
  username: string;
}

export default function UserProfile({ session, username }: Props) {
  const segment = useSelectedLayoutSegment();
  const { data: user } = useUserQuery(username);

  if (
    segment &&
    [
      'verified_followers',
      'followers',
      'following',
      'status',
      'lists',
    ].includes(segment)
  ) {
    return null;
  }

  return (
    <>
      <UserBanner username={username} banner={user?.data.banner} />
      <div className={styles.information}>
        <UserImage session={session} user={user?.data} />
        <div className={styles.userText}>
          <UserIdentifier
            sessionid={session?.user?.email}
            username={username}
            user={user?.data}
          />
          <UserDesc desc={user?.data.desc} />
          <UserSince session={session} user={user?.data} />
          <UserFollowInfo user={user?.data} />
        </div>
      </div>
    </>
  );
}
