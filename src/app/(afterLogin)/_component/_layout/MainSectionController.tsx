'use client';

import styles from './layout.controller.module.css';
import cx from 'classnames';
import { useSelectedLayoutSegments } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export default function MainSectionController({ children }: Props) {
  const segments = useSelectedLayoutSegments();
  const [a, b] = segments;
  const conditions = ['settings', 'messages'].includes(a);

  return (
    <main className={cx(styles.flex_column, !conditions && styles.main)}>
      {children}
    </main>
  );
}
