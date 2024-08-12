'use client';

import styles from './beforeLogin.signup.module.css';
import { MouseEventHandler } from 'react';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import useSignUp from '@/app/(beforeLogin)/_hooks/useSignUp';

export default function SignUpButton() {
  const { options, disabled, nextPage } = useSignUp();

  const onClickNextPage: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    nextPage();
  };

  if (options.edit) {
    return null;
  }

  return (
    <div className={styles.largeBtn}>
      <FlexButton
        text={options.page === 2 ? 'Sign up' : 'Next'}
        onClick={onClickNextPage}
        theme={options.page === 2 ? 'reverse' : 'theme'}
        large
        isLoading={options.isLoading}
        disabled={disabled}
      />
    </div>
  );
}
