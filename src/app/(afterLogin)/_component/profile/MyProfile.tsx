'use client';

import styles from './profile.module.css';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { generateImagePath } from '@/app/_lib/common';
import SpinnerSvg from '@/app/_svg/spinner/SpinnerSvg';

interface Props {
  width?: number;
  height?: number;
}

export default function MyProfile({ width = 45, height = 45 }: Props) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div
        className={styles.spinner}
        style={{
          width,
          height,
        }}
      >
        <SpinnerSvg />
      </div>
    );
  }

  if (!session || !session.user || !session.user.image) {
    return null;
  }

  return (
    <Image
      src={generateImagePath(session.user.image)}
      alt={session.user.email as string}
      width={width}
      height={width}
      className={styles.profile}
      style={{
        width,
        height,
      }}
    />
  );
}
