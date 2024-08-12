'use client';

import styles from './profile.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import Image from 'next/image';
import { generateImagePath } from '@/app/_lib/common';
import { Session } from 'next-auth';

interface Props {
  session: Session;
  width?: number;
  height?: number;
}

export default function MyProfile({ session, width = 45, height = 45 }: Props) {
  if (!session || !session.user || !session.user.image) {
    return null;
  }

  return (
    <div className={cx(utils.br_9999, utils.of_hide)}>
      <Image
        className={styles.profile}
        src={generateImagePath(session.user.image)}
        alt={session.user.email as string}
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
