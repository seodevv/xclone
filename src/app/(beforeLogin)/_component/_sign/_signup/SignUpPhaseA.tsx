'use client';

import styles from './beforeLogin.signup.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import SignModalTitle from '@/app/(beforeLogin)/_component/_sign/_signup/SIgnModalTitle';
import AlreadyAccount from '@/app/(beforeLogin)/_component/_sign/_signup/AlreadyAccount';
import BirthSelector from '@/app/(beforeLogin)/_component/_sign/BirthSelector';
import useSignUp from '@/app/(beforeLogin)/_hooks/useSignUp';
import IdentifierInput from '@/app/_component/_input/IdentifierInput';

export default function SignUpPhaseA() {
  const {
    id,
    nickname,
    birth,
    options: { prevPage, page, animated, isLoading },
    disabled,
    set,
    nextPage,
  } = useSignUp();

  return (
    <div
      className={cx(
        styles.slide,
        animated &&
          (prevPage < page ? utils.slide_right_in : utils.slide_left_in)
      )}
    >
      <div className={styles.content}>
        <SignModalTitle text="Create your account" />
        <IdentifierInput
          ref={id.ref}
          placeholder="Name"
          defaultValue={id.value}
          validate={{
            minLength: 3,
            maxLength: 50,
            required: true,
            message: 'What’s your name?',
          }}
          onSuccess={(value) => {
            set({ type: 'id', payload: { value, disabled: false } });
          }}
          onError={() => set({ type: 'id', payload: { disabled: true } })}
          onEnter={() => {
            nickname.ref?.current?.focus();
          }}
          disabled={isLoading}
        />
        <IdentifierInput
          ref={nickname.ref}
          placeholder="Nickname"
          defaultValue={nickname.value}
          validate={{
            maxLength: 24,
            required: true,
            message: 'What’s your nickname?',
            allowEmpty: true,
          }}
          onSuccess={(value) => {
            set({
              type: 'nickname',
              payload: { value, disabled: false },
            });
          }}
          onError={() => {
            set({ type: 'nickname', payload: { disabled: true } });
          }}
          onEnter={() => {
            if (disabled) {
              birth.ref?.current?.focus();
            } else {
              nextPage();
            }
          }}
          disabled={isLoading}
        />
        <AlreadyAccount />
        <div className={styles.rule}>
          <div className={styles.ruleTitle}>Date of birth</div>
          <div className={styles.ruleSub}>
            This will not be shown publicly. Confirm your own age, even if this
            account is for a business, a pet, or something else.
          </div>
        </div>
        <div>
          <BirthSelector
            ref={birth.ref}
            defaultValue={birth.value}
            onSuccess={(date) => {
              const value = `${date.getFullYear()}-${
                date.getMonth() + 1
              }-${date.getDate()}`;
              set({ type: 'birth', payload: { value, disabled: false } });
            }}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
