'use client';

import { useRouter } from 'next/navigation';
import styles from './settingsProfileSlot.module.css';
import { MouseEventHandler } from 'react';

interface Props {
  children: React.ReactNode;
}

export default function SettingsProfileSlotOutSide({ children }: Props) {
  const router = useRouter();

  const onClickMain: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.currentTarget === e.target) {
      router.back();
    }
  };

  return (
    <main className={styles.main} onClick={onClickMain}>
      {children}
    </main>
  );
}
