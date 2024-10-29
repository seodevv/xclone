'use client';

import styles from './button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';

interface Props {
  className?: string;
  style?: CSSProperties;
  type?: 'submit' | 'reset' | 'button';
  text: string;
  theme?: 'theme' | 'reverse' | 'primary' | 'primary_reverse' | 'white';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function TextButton({
  className,
  style,
  type,
  text,
  theme = 'primary',
  size = 'medium',
  loading,
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
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
    >
      <span className={cx(loading && styles.invisible)}>{text}</span>
      {loading && (
        <div className={styles.loading}>
          <LoadingSpinner />
        </div>
      )}
    </button>
  );
}
