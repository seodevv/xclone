'use client';

import styles from './beforeLogin.signup.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import SignModalTitle from '@/app/(beforeLogin)/_component/_sign/_signup/SIgnModalTitle';
import IdentifierInput from '@/app/(beforeLogin)/_component/_sign/IdentifierInput';
import useSignUp from '@/app/(beforeLogin)/_component/_sign/_signup/useSignUp';

export default function SignUpPhaseB() {
  const {
    id,
    nickname,
    password,
    options: { prevPage, page, animated },
    set,
    nextPage,
  } = useSignUp();

  return (
    <div
      className={cx(
        styles.slide,
        animated && prevPage < page ? styles.slideRightIn : styles.slideLeftIn
      )}
    >
      <div className={styles.content}>
        <SignModalTitle text="Your'll need a password" />
        <div>
          <div className={styles.ruleSub}>
            The name and nickname you enter will be used as your identity.
          </div>
          <IdentifierInput
            placeholder="Name"
            defaultValue={id.value}
            disabled
          />
          <IdentifierInput
            placeholder="Nickname"
            defaultValue={nickname.value}
            disabled
          />
        </div>
        <div className={utils.mt_30}>
          <div className={styles.ruleTitle}>
            Please enter the password with a pattern that is as difficult as
            possible.
          </div>
          <div className={styles.ruleSub}>
            Make sure it’s 3 characters or more.
          </div>
          <div>
            <IdentifierInput
              ref={password.ref}
              type="password"
              placeholder="Create password"
              validate={{
                minLength: 3,
              }}
              defaultValue={password.value}
              onSuccess={(value) => {
                set({ type: 'password', payload: { value, disabled: false } });
              }}
              onError={() => {
                set({ type: 'password', payload: { disabled: true } });
              }}
              onEnter={() => {
                nextPage();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
