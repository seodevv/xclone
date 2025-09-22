'use client';

import styles from './userProfile.module.css';
import { AdvancedUser } from '@/model/User';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';

interface Props {
  user?: AdvancedUser;
}

export default function UserFollowInfo({ user }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const onClickLink: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!session) {
      e.preventDefault();
      router.push('/i/flow/login');
    }
  };

  if (!user) return null;

  return (
    <div className={styles.userFollowInfo}>
      <div className={styles.userFollow}>
        <Link href={`/${user.id}/following`} onClick={onClickLink}>
          <span className={styles.number}>{user._count.Followings}</span>
          <span className={styles.text}>Following</span>
        </Link>
      </div>
      <div className={styles.userFollow}>
        <Link href={`/${user.id}/verified_followers`} onClick={onClickLink}>
          <span className={styles.number}>{user._count.Followers}</span>
          <span className={styles.text}>Follower</span>
        </Link>
      </div>
    </div>
  );
}
