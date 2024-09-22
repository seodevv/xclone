'use client';

import styles from './userPhoto.background.module.css';
import cx from 'classnames';
import { useRouter } from 'next/navigation';
import CloseButton from '@/app/(afterLogin)/_component/buttons/CloseButton';
import { MouseEventHandler, useContext } from 'react';
import { PathRecordContext } from '@/app/_provider/PathRecordProvider';

interface Props {
  username: string;
  children: React.ReactNode;
}

export default function UserPhotoBackground({ username, children }: Props) {
  const router = useRouter();
  const ctx = useContext(PathRecordContext);
  const prevPath = `/${username}`;

  const onClick: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    if (ctx.prevPath === ctx.path) {
      router.push(prevPath);
    } else {
      router.back();
    }
  };

  return (
    <main className={cx(styles.background, styles.fadeIn)} onClick={onClick}>
      <div className={styles.close}>
        <CloseButton width={20} prevPath={prevPath} />
      </div>
      {children}
    </main>
  );
}
