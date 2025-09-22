'use client';

import styles from './beforeLogin.button.module.css';
import { CSSProperties, useContext } from 'react';
import XMarkSvg from '@/app/_svg/tweet/XMarkSvg';
import { PathRecordContext } from '@/app/_provider/PathRecordProvider';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  disabled?: boolean;
}

export default function CloseButton({ width = 20, disabled }: Props) {
  const { routerBack } = useContext(PathRecordContext);

  const onClickClose = () => {
    if (disabled) return;
    routerBack();
  };

  return (
    <>
      <button
        className={styles.closeBtn}
        onClick={onClickClose}
        type="button"
        disabled={disabled}
      >
        <XMarkSvg width={width} />
      </button>
    </>
  );
}
