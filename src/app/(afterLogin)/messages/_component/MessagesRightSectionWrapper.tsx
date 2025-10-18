'use client';

import styles from './messages.right.module.css';
import cx from 'classnames';
import { usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export default function MessagesRightSectionWrapper({ children }: Props) {
  const pathname = usePathname();

  return (
    <section
      className={cx(styles.right, pathname === '/messages' && styles.messages)}
    >
      {children}
    </section>
  );
}
