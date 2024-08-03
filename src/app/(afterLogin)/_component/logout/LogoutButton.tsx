'use client';

import styles from './logout.module.css';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export default function LogoutButton({ children }: Props) {
  const router = useRouter();
  const onClickLogout = async () => {
    try {
      await signOut({ redirect: false });
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/logout`, {
        method: 'post',
        credentials: 'include',
      });
      router.push('/');
      // router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className={styles.logOutButton} onClick={onClickLogout}>
      {children}
    </button>
  );
}
