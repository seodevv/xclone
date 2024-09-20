'use client';

import styles from './logout.module.css';
import Image from 'next/image';
import { generateImagePath } from '@/app/_lib/common';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();
  const { data: session } = useSession();
  const onClickLogout = async () => {
    try {
      await signOut({ redirect: false });
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/logout`, {
        method: 'post',
        credentials: 'include',
      });
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  if (!session || !session.user) {
    return null;
  }

  return (
    <button className={styles.logOutButton} onClick={onClickLogout}>
      <div className={styles.logOutUserImage}>
        {session.user.image && (
          <Image
            src={generateImagePath(session.user.image)}
            alt={session.user.email as string}
            width={50}
            height={50}
          />
        )}
      </div>
      <div className={styles.logOutUserName}>
        <div>{session.user.name}</div>
        <div>@{session.user.email}</div>
      </div>
    </button>
  );
}
