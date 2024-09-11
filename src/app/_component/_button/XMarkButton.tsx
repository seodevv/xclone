'use client';

import styles from './button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';
import XMarkSvg from '@/app/_svg/tweet/XMarkSvg';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export default function XMarkButton({
  className,
  style,
  width = 20,
  onClick,
  disabled,
}: Props) {
  return (
    <button
      className={cx(styles.btn, className)}
      style={style}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      <XMarkSvg width={width} white />
    </button>
  );
}
