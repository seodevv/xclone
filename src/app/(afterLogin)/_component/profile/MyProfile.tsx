'use client';

import styles from './profile.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import Image from 'next/image';
import { generateImagePath } from '@/app/_lib/common';
import { useSession } from 'next-auth/react';

interface Props {
  width?: number;
  height?: number;
  onClick?: () => void;
}

export default function MyProfile({ width = 45, height = 45, onClick }: Props) {
  const { data: session } = useSession();

  const onClickImage = () => {
    if (typeof onClick === 'function') {
      onClick();
    }
  };

  if (!session || !session.user?.image) {
    return null;
  }

  return (
    <div
      className={cx(utils.br_9999, utils.of_hide)}
      onClick={onClickImage}
      style={{ width, height }}
    >
      <Image
        className={styles.profile}
        src={generateImagePath(session.user.image)}
        alt={session.user.image}
        width={width}
        height={width}
        style={{
          width,
          height,
        }}
      />
    </div>
  );
}
