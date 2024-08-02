'use client';

import styles from './followRecommend.module.css';
import { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cx from 'classnames';
import { generateImagePath } from '@/app/_lib/common';
import { AdvancedUser } from '@/model/User';
import FollowButton from '@/app/(afterLogin)/_component/buttons/FollowButton';

interface Props {
  className?: string;
  style?: CSSProperties;
  user: AdvancedUser;
  isDesc?: boolean;
}

export default function FollowRecommend({
  className,
  style,
  user,
  isDesc,
}: Props) {
  return (
    <Link
      className={cx(styles.container, className)}
      style={style}
      href={`/${user.id}`}
    >
      <div className={styles.userLogo}>
        <Image
          src={generateImagePath(user.image)}
          alt={user.id}
          width={40}
          height={40}
        />
      </div>
      <div className={styles.userInfo}>
        <div className={styles.flex}>
          <div className={styles.grow}>
            <div className={styles.nickname}>{user.nickname}</div>
            <div className={styles.identifier}>@{user.id}</div>
          </div>
          <FollowButton user={user} />
        </div>
        {isDesc && user.desc && (
          <div className={styles.description}>{user.desc}</div>
        )}
      </div>
    </Link>
  );
}
