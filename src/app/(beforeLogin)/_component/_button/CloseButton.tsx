'use client';

import styles from './beforeLogin.button.module.css';
import { useRouter } from 'next/navigation';
import { CSSProperties } from 'react';
import XMarkSvg from '@/app/_svg/tweet/XMarkSvg';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  disabled?: boolean;
}

export default function CloseButton({ width = 20, disabled }: Props) {
  const router = useRouter();
  const onClickClose = () => {
    if (disabled) return;
    router.back();
  };

  return (
    <>
      <button
        className={styles.closeBtn}
        onClick={onClickClose}
        type="button"
        disabled={disabled}
      >
        <XMarkSvg width={width} white />
      </button>
    </>
  );
}
