'use client';

import styles from './button.module.css';
import { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import LeftArrowSvg from '@/app/_svg/arrow/LeftArrowSvg';
import cx from 'classnames';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
}

export default function BackButton({ className, style, width = 18 }: Props) {
  const router = useRouter();

  const onClick = () => {
    router.back();
  };

  return (
    <button
      className={cx(styles.btn, styles.backBtn, className)}
      style={style}
      onClick={onClick}
    >
      <LeftArrowSvg width={width} white />
    </button>
  );
}
