import styles from './profile.module.css';
import { generateImagePath } from '@/app/_lib/common';
import Image from 'next/image';
import Link from 'next/link';
import cx from 'classnames';
import { SafeUser } from '@/model/User';
import { CSSProperties } from 'react';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  user: SafeUser;
  isSingle?: boolean;
}

export default function OtherProfile({
  className,
  style,
  width = 40,
  user,
  isSingle,
}: Props) {
  return (
    <Link
      href={`/${user.id}`}
      className={cx(
        styles.otherProfile,
        isSingle && styles.isSingle,
        className
      )}
      onClick={(e) => {
        e.stopPropagation();
      }}
      style={{ ...style, width, height: width }}
    >
      <Image
        src={generateImagePath(user.image)}
        alt={user.id}
        width={width}
        height={width}
      />
    </Link>
  );
}
