'use client';

import { CSSProperties, MouseEventHandler } from 'react';
import styles from './tab.module.css';
import cx from 'classnames';
import { capitalCase } from '@/app/_lib/common';

interface Props {
  className?: string;
  style?: CSSProperties;
  onClick: MouseEventHandler<HTMLButtonElement>;
  text: string;
  active: boolean;
}

export default function TabButton({
  className,
  style,
  onClick,
  text,
  active,
}: Props) {
  return (
    <button
      className={cx(styles.tab, className)}
      style={style}
      onClick={onClick}
    >
      <div className={cx(styles.navigation, active && styles.active)}>
        <div className={styles.text}>{capitalCase(text)}</div>
        <div className={styles.underline}></div>
      </div>
    </button>
  );
}
