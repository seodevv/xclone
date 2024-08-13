import styles from './userProfile.module.css';
import { AdvancedUser } from '@/model/User';
import Link from 'next/link';

interface Props {
  user?: AdvancedUser;
}

export default function UserFollowInfo({ user }: Props) {
  if (!user) return null;

  return (
    <div className={styles.userFollowInfo}>
      <div className={styles.userFollow}>
        <Link href={`/${user.id}/following`}>
          <span className={styles.number}>{user._count.Followings}</span>
          <span className={styles.text}>Following</span>
        </Link>
      </div>
      <div className={styles.userFollow}>
        <Link href={`/${user.id}/verified_followers`}>
          <span className={styles.number}>{user._count.Followers}</span>
          <span className={styles.text}>Follower</span>
        </Link>
      </div>
    </div>
  );
}
