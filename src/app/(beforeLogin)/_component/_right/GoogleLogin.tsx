'use client';

import styles from './beforeLogin.right.module.css';
import { signIn } from 'next-auth/react';
import cx from 'classnames';
import GoogleSvg from '@/app/_svg/logo/GoogleSvg';

export default function GoogleLogin() {
  const onClickGoogleLogin = async () => {
    signIn('google', { callbackUrl: '/home' });
  };

  return (
    <>
      <button
        type="button"
        className={cx(styles.login, styles.google)}
        onClick={onClickGoogleLogin}
      >
        <GoogleSvg className={styles.googleSvg} width={25} />
        <span>Sign up with Google</span>
      </button>
    </>
  );
}
