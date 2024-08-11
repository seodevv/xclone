'use client';

import styles from './beforelogin.login.module.css';
import CloseButton from '@/app/(beforeLogin)/_component/_button/CloseButton';
import PrevButton from '@/app/(beforeLogin)/_component/_button/PrevButton';
import XLogoSvg from '@/app/_svg/logo/XLogoSvg';

interface Props {
  isNext?: boolean;
  callback?: () => void;
  disabled?: boolean;
}

export default function LoginModalHeader({
  isNext,
  callback,
  disabled,
}: Props) {
  const onClickPrev = () => {
    if (typeof callback === 'function') {
      callback();
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.close}>
          {isNext ? (
            <PrevButton onClick={onClickPrev} disabled={disabled} />
          ) : (
            <CloseButton disabled={disabled} />
          )}
        </div>
        <div className={styles.logo}>
          <XLogoSvg className={styles.xLogo} />
        </div>
        <div className={styles.grow}></div>
      </div>
    </div>
  );
}
