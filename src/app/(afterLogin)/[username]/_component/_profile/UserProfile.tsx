'use client';

import style from './userProfile.module.css';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Session } from 'next-auth';
import { useUserQuery } from '../../_hooks/useUserQuery';
import BadgeButton from '../../../_component/buttons/BadgeButton';
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
    ['verified_followers', 'followers', 'following', 'status'].includes(segment)
  ) {
    return null;
  }

  return (
    <>
      <UserBanner banner={user?.data.banner} />
      <div className={style.information}>
        <UserImage session={session} user={user?.data} />
        <div className={style.userText}>
          <UserIdentifier username={username} user={user?.data} />
          <UserDesc desc={user?.data.desc} />
          <UserSince refer={user?.data.refer} regist={user?.data.regist} />
          <UserFollowInfo user={user?.data} />
        </div>
      </div>
    </>
  );
}
