'use client';

import styles from '../settings.layout.module.css';
import cx from 'classnames';
import { usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export default function SettingsRightSection({ children }: Props) {
  const pathname = usePathname();

  return (
    <section
      className={cx(styles.right, pathname === '/settings' && styles.w_0)}
    >
      {children}
    </section>
  );
}
