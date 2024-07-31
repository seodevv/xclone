'use client';

import styles from './button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';

interface Props {
  className?: string;
  style?: CSSProperties;
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function TextButton({ className, style, text, onClick }: Props) {
  return (
    <button
      className={cx(styles.btn, styles.primaryBtn, className)}
      style={style}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
}
