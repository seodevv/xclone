import styles from './tab.module.css';
import { CSSProperties } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { captialCase } from '@/app/_lib/common';

interface Props {
  className?: string;
  style?: CSSProperties;
  href: string;
  text: string;
  active: boolean;
}

export default function TabLink({
  className,
  style,
  href,
  text,
  active,
}: Props) {
  return (
    <div className={cx(styles.tab, className)} style={style}>
      <Link
        className={cx(styles.navigation, active && styles.active)}
        href={href}
      >
        <div className={styles.text}>{captialCase(text)}</div>
        <div className={styles.underline}></div>
      </Link>
    </div>
  );
}
