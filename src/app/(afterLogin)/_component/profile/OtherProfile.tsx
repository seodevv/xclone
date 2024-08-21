import styles from './profile.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import { generateImagePath } from '@/app/_lib/common';
import Image from 'next/image';
import Link from 'next/link';
import { SafeUser } from '@/model/User';
import { CSSProperties } from 'react';
import { Mode } from '@/app/(afterLogin)/_component/post/Post';

interface Props {
  className?: string;
  style?: CSSProperties;
  mode?: Mode;
  width?: number;
  user: SafeUser;
  noevent?: boolean;
}

export default function OtherProfile({
  className,
  style,
  mode,
  width = 40,
  user,
  noevent,
}: Props) {
  return (
    <Link
      href={`/${user.id}`}
      className={cx(
        styles.otherProfile,
        mode === 'single' && styles.isSingle,
        (mode === 'compose' || noevent) && utils.pointer_event_none,
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
