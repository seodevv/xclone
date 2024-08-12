'use client';

import styles from './beforeLogin.signup.module.css';
import CloseButton from '@/app/(beforeLogin)/_component/_button/CloseButton';
import PrevButton from '@/app/(beforeLogin)/_component/_button/PrevButton';
import useSignUp from '@/app/(beforeLogin)/_component/_sign/_signup/useSignUp';
import XLogoSvg from '@/app/_svg/logo/XLogoSvg';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignUpModalHeader() {
  const router = useRouter();
  const {
    options: { page, isLoading, edit },
    prevPage,
  } = useSignUp();

  const onClickPrev = () => {
    prevPage();
  };

  useEffect(() => {
    router.refresh();
  }, [router]);

  if (edit) return null;
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.close}>
          {page !== 0 ? (
            <PrevButton onClick={onClickPrev} disabled={isLoading} />
          ) : (
            <CloseButton disabled={isLoading} />
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
