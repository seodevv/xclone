'use client';

import styles from './logout.module.css';
import Image from 'next/image';
import { generateImagePath } from '@/app/_lib/common';
import { useSession } from 'next-auth/react';
import { MouseEventHandler, useContext } from 'react';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';

export default function Logout() {
  const { data: session } = useSession();
  const { dispatchMenu } = useContext(SubMenuContext);
  const onClickLogout: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
    dispatchMenu({
      type: 'set',
      payload: {
        flag: true,
        position: {
          x,
          y,
          width,
          height,
          target: e.currentTarget,
        },
        status: {
          type: 'sign',
        },
      },
    });
  };

  if (!session || !session.user) {
    return null;
  }

  return (
    <div className={styles.container}>
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
    </div>
  );
}
