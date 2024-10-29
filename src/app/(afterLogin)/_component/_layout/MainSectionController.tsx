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

  return (
    <main className={cx(a !== 'settings' && styles.main)}>{children}</main>
  );
}
