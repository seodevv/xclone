'use client';

import styles from './followRecommend.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { generateImagePath } from '@/app/_lib/common';
import { AdvancedUser } from '@/model/User';
import FollowButton from '@/app/(afterLogin)/_component/buttons/FollowButton';
import { CSSProperties } from 'react';

interface Props {
  style?: CSSProperties;
  user: AdvancedUser;
  isDesc?: boolean;
}

export default function FollowRecommend({ style, user, isDesc }: Props) {
  return (
    <Link className={styles.container} style={style} href={`/${user.id}`}>
      <div className={styles.userLogoSection}>
        <div className={styles.userLogo}>
          <Image
            src={generateImagePath(user.image)}
            alt={user.id}
            width={40}
            height={40}
          />
        </div>
      </div>
      <div className={styles.userInfo}>
        <div>
          <div>
            <div className={styles.nickname}>{user.nickname}</div>
            <div className={styles.identifier}>@{user.id}</div>
          </div>
          <FollowButton className={styles.follow} user={user} />
        </div>
        {isDesc && user.desc && (
          <div className={styles.description}>{user.desc}</div>
        )}
      </div>
    </Link>
  );
}
