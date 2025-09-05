'use client';

import styles from './room.body.module.css';
import { useContext } from 'react';
import { MessagesScrollContext } from '@/app/(afterLogin)/messages/[room]/_provider/MessagesScrollProvider';

interface Props {
  children: React.ReactNode;
}

export default function RoomScrollWrapper({ children }: Props) {
  const { scrollRef } = useContext(MessagesScrollContext);

  return (
    <div ref={scrollRef} className={styles.content}>
      {children}
    </div>
  );
}
