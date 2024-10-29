'use client';

import styles from './trendSection.module.css';
import { Session } from 'next-auth';
import Trends from '@/app/(afterLogin)/_component/trends/Trends';
import { useSelectedLayoutSegments } from 'next/navigation';

interface Props {
  session: Session | null;
}

export default function TrendSection({ session }: Props) {
  const segments = useSelectedLayoutSegments();
  const [a, b] = segments;

  if (
    a === 'explore' ||
    a === 'messages' ||
    a === 'settings' ||
    (a === 'i' && b === 'trends') ||
    !session
  ) {
    return null;
  }

  return (
    <section className={styles.trendSection}>
      <Trends />
    </section>
  );
}
