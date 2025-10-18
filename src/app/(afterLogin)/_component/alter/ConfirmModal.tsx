'use client';

import styles from './confirmModal.module.css';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import { MouseEventHandler } from 'react';
import XLogoSvg from '@/app/_svg/logo/XLogoSvg';

interface Props {
  x?: boolean;
  title: string;
  sub: string;
  btnText: string;
  btnTheme?: 'theme' | 'reverse' | 'white' | 'red' | 'primary';
  onClickOutSide?: () => void;
  onClickConfirm: MouseEventHandler<HTMLButtonElement>;
  onClickCancle: () => void;
  noHidden?: boolean;
}

export default function ConfirmModal({
  x = false,
  title,
  sub,
  btnText,
  btnTheme = 'theme',
  onClickOutSide,
  onClickConfirm,
  onClickCancle,
  noHidden,
}: Props) {
  const onClickBackground = () => {
    if (typeof onClickOutSide === 'function') {
      onClickOutSide();
    } else if (typeof onClickCancle === 'function') {
      onClickCancle();
    }
  };

  return (
    <IBackground
      size="small"
      onClick={onClickBackground}
      noHidden={noHidden}
      confirm
    >
      {x && (
        <div className={styles.xLogo}>
          <XLogoSvg theme="theme" width={40} />
        </div>
      )}
      {title !== '' && (
        <div className={styles.title}>
          <span>{title}</span>
        </div>
      )}
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
