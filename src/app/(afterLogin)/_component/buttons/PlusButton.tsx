'use client';

import styles from './button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';
import PlusSvg from '@/app/_svg/tweet/PlusSvg';

interface Props {
  className?: string;
  style?: CSSProperties;
  theme?: 'theme' | 'reverse' | 'primary' | 'primary_reverse';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function PlusButton({
  className,
  style,
  theme = 'primary',
  size = 'medium',
  disabled,
  onClick,
}: Props) {
  return (
    <button
      className={cx(styles.btn, styles[theme], styles[size], className)}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      <PlusSvg width={18} inherit />
    </button>
  );
}
