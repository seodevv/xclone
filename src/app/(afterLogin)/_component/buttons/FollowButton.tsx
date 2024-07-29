'use client';

import styles from './button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import { useSession } from 'next-auth/react';
import cx from 'classnames';
import { AdvancedUser } from '@/model/User';

interface Props {
  className?: string;
  style?: CSSProperties;
  user: AdvancedUser;
  disabled?: boolean;
}

export default function FollowButton({
  className,
  style,
  user,
  disabled,
}: Props) {
  const { data: session } = useSession();
  const isFollow = user.Followers.some((u) => u.id === session?.user?.email);

  const onFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <button
      className={cx(styles.btn, styles.followBtn, className)}
      style={style}
      onClick={onFollow}
      disabled={disabled}
    >
      {isFollow ? 'Following' : 'Follow'}
    </button>
  );
}
