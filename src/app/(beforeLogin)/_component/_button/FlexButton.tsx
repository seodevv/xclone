'use client';

import styles from './beforeLogin.button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import { useFormStatus } from 'react-dom';

interface Props {
  className?: string;
  style?: CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  theme?:
    | 'theme'
    | 'reverse'
    | 'white'
    | 'red'
    | 'primary'
    | 'secondary'
    | 'transparent'
    | 'disabled';
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  disabled?: boolean;
  large?: boolean;
  medium?: boolean;
  underline?: boolean;
  grow?: boolean;
}

export default function FlexButton({
  className,
  style,
  type = 'button',
  theme = 'theme',
  text,
  onClick,
  isLoading = false,
  disabled = false,
  large,
  medium,
  underline,
  grow,
}: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      className={cx(
        styles.btn,
        styles[theme],
        large && styles.large,
        medium && styles.medium,
        grow && styles.grow,
        className
      )}
      style={style}
      type={type}
      onClick={onClick}
      disabled={disabled || (type === 'submit' && pending)}
    >
      <div className={cx(styles.btnText, large && styles.large)}>
        {isLoading || (type === 'submit' && pending) ? (
          <LoadingSpinner
            style={{ padding: 0 }}
            fill={theme === 'theme' || theme === 'white' ? 'reverse' : 'theme'}
          />
        ) : (
          <span className={cx(underline && styles.underline)}>{text}</span>
        )}
      </div>
    </button>
  );
}
