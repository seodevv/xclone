'use client';

import styles from './beforeLogin.login.module.css';
import CloseButton from '@/app/(beforeLogin)/_component/_button/CloseButton';
import PrevButton from '@/app/(beforeLogin)/_component/_button/PrevButton';
import { LoginContext } from '@/app/(beforeLogin)/_component/_sign/_login/LoginProvider';
import XLogoSvg from '@/app/_svg/logo/XLogoSvg';
import { useContext } from 'react';

interface Props {
  disabled?: boolean;
}

export default function LoginModalHeader({ disabled }: Props) {
  const { state, dispatch } = useContext(LoginContext);

  const onClickPrev = () => {
    dispatch({ type: 'prevPage' });
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.close}>
          {state.options.page !== 0 ? (
            <PrevButton onClick={onClickPrev} disabled={disabled} />
          ) : (
            <CloseButton disabled={disabled} />
          )}
        </div>
        <div className={styles.logo}>
          <XLogoSvg className={styles.xLogo} theme="theme" />
        </div>
        <div className={styles.grow}></div>
      </div>
    </div>
  );
}
