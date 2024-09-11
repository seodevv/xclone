'use client';

import styles from './confirmModal.module.css';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import { MouseEventHandler } from 'react';

interface Props {
  title: string;
  sub: string;
  btnText: string;
  btnTheme: 'theme' | 'reverse' | 'white' | 'red' | 'primary';
  onClickOutSide?: () => void;
  onClickConfirm: MouseEventHandler<HTMLButtonElement>;
  onClickCancle: () => void;
}

export default function ConfirmModal({
  title,
  sub,
  btnText,
  btnTheme = 'white',
  onClickOutSide,
  onClickConfirm,
  onClickCancle,
}: Props) {
  return (
    <IBackground size="small" onClick={onClickOutSide}>
      <div className={styles.title}>
        <span>{title}</span>
      </div>
      <div className={styles.desc}>
        <span>{sub}</span>
      </div>
      <div className={styles.buttons}>
        <FlexButton
          theme={btnTheme}
          text={btnText}
          medium
          onClick={onClickConfirm}
        />
        <FlexButton
          theme="reverse"
          text="Cancel"
          medium
          onClick={onClickCancle}
        />
      </div>
    </IBackground>
  );
}
