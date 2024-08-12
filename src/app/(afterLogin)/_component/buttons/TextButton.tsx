'use client';

import styles from './button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';

interface Props {
  className?: string;
  style?: CSSProperties;
  text: string;
  type?: 'temporary' | 'primary' | 'primary_trans';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function TextButton({
  className,
  style,
  text,
  type = 'primary',
  onClick,
}: Props) {
  return (
    <button
      className={cx(
        styles.btn,
        styles.textBtn,
        type === 'temporary' && styles.temporaryBtn,
        type === 'primary' && styles.primaryBtn,
        type === 'primary_trans' && styles.primaryTransBtn,
        className
      )}
      style={style}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
}
