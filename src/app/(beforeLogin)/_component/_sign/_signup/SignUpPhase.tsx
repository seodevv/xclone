'use client';

import styles from './beforeLogin.signup.module.css';
import utils from '@/app/utility.module.css';
import SignUpPhaseA from '@/app/(beforeLogin)/_component/_sign/_signup/SignUpPhaseA';
import SignUpPhaseB from '@/app/(beforeLogin)/_component/_sign/_signup/SignUpPhaseB';
import SignUpPhaseC from '@/app/(beforeLogin)/_component/_sign/_signup/SignUpPhaseC';
import cx from 'classnames';
import useSignUp from '@/app/(beforeLogin)/_hooks/useSignUp';

export default function SignUpPhase() {
  const {
    options: { page, edit },
  } = useSignUp();

  if (page === 0) {
    return (
      <div className={styles.phase}>
        <SignUpPhaseA />
      </div>
    );
  }

  if (page === 1) {
    return (
      <div className={styles.phase}>
        <SignUpPhaseB />
      </div>
    );
  }

  if (page === 2) {
    return (
      <div className={cx(styles.phase, edit && utils.ma_0)}>
        <SignUpPhaseC />
      </div>
    );
  }

  return null;
}
