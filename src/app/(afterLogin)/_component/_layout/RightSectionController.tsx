'use client';

import styles from './layout.controller.module.css';
import { useSelectedLayoutSegments } from 'next/navigation';

interface Props {
  children?: React.ReactNode;
}

export default function RightSectionController({ children }: Props) {
  const segments = useSelectedLayoutSegments();
  const [a, b] = segments;

  if (a === 'settings') return null;

  return <section className={styles.rightSection}>{children}</section>;
}
