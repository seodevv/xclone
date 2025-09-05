'use client';

import styles from './beforeLogin.button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import LeftArrowSvg from '@/app/_svg/arrow/LeftArrowSvg';
import cx from 'classnames';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export default function PrevButton({
  className,
  style,
  width = 20,
  onClick,
  disabled,
}: Props) {
  return (
    <button
      className={cx(styles.closeBtn, className)}
      style={style}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      <LeftArrowSvg width={width} theme="theme" />
    </button>
  );
}
