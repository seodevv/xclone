'use client';

import styles from './button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';

interface Props {
  className?: string;
  style?: CSSProperties;
  text: string;
  theme?: 'theme' | 'reverse' | 'primary' | 'primary_reverse';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function TextButton({
  className,
  style,
  text,
  theme = 'primary',
  size = 'medium',
  disabled,
  onClick,
}: Props) {
  return (
    <button
      className={cx(
        styles.btn,
        styles.textBtn,
        styles[theme],
        styles[size],
        className
      )}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{text}</span>
    </button>
  );
}
