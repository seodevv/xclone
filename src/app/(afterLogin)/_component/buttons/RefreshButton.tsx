'use client';

import styles from './button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';
import RefreshSvg from '@/app/_svg/error/RefreshSvg';

interface Props {
  className?: string;
  style?: CSSProperties;
  text?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function RefreshButton({
  className,
  style,
  text = 'Retry',
  onClick,
}: Props) {
  return (
    <button
      className={cx(styles.btn, styles.refreshBtn, className)}
      style={style}
      onClick={onClick}
    >
      <RefreshSvg white />
      <span>{text}</span>
    </button>
  );
}
