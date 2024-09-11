'use client';

import styles from './button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';
import PhotoSvg from '@/app/_svg/post/PhotoSvg';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export default function PhotoButton({
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
      <PhotoSvg width={width} white />
    </button>
  );
}
