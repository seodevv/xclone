import BalloonSvg from '@/app/_svg/profile/BalloonSvg';
import styles from './userSince.module.css';
import { AdvancedUser } from '@/model/User';
import { MONTH_EN } from '@/app/_lib/common';

interface Props {
  sessionId?: string | null;
  user: AdvancedUser;
}

export default function UserBirth({ sessionId, user }: Props) {
  if (!user.birth) return;

  const date = new Date(user.birth.date);
  const scope = user.birth.scope;
  const isOwn = sessionId === user.id;
  const isFollower = user.Followers.some((u) => u.id === sessionId);
  const isFollowing = user.Followings.some((u) => u.id === sessionId);

  const month =
    scope.month === 'public' ||
    (scope.month === 'follower' && isFollower) ||
    (scope.month === 'following' && isFollowing) ||
    (scope.month === 'each' && isFollower && isFollowing) ||
    isOwn
      ? MONTH_EN[date.getMonth()] + ' ' + date.getDate()
      : undefined;
  const year =
    scope.year === 'public' ||
    (scope.year === 'follower' && isFollower) ||
    (scope.year === 'following' && isFollowing) ||
    (scope.year === 'each' && isFollower && isFollowing) ||
    isOwn
      ? date.getFullYear()
      : undefined;

  if (!month && !year) return null;

  return (
    <span className={styles.since}>
      <div className={styles.svg}>
        <BalloonSvg />
      </div>
      <span>
        {`Born ${month && year ? `${month}, ${year}` : month ? month : year}`}
      </span>
    </span>
  );
}
