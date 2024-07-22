'use client';

import styles from './button.module.css';
import { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import LeftArrowSvg from '@/app/_svg/arrow/LeftArrowSvg';
import cx from 'classnames';

interface Props {
  className?: string;
  style?: CSSProperties;
}

export default function BackButton({ className, style }: Props) {
  const router = useRouter();

  const onClick = () => {
    router.back();
  };

  return (
    <button
      className={cx(styles.backBtn, className)}
      style={style}
      onClick={onClick}
    >
      <LeftArrowSvg width={18} white />
    </button>
  );
}
