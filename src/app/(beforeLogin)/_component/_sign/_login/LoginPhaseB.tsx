'use client';

import styles from './beforeLogin.login.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import NoAccount from '@/app/(beforeLogin)/_component/_sign/_login/NoAccount';
import { useContext, useEffect } from 'react';
import { LoginContext } from '@/app/(beforeLogin)/_component/_sign/_login/LoginProvider';
import { useFormState } from 'react-dom';
import LoginAction from '@/app/(beforeLogin)/_component/_sign/_login/LoginAction';
import useAlterModal from '@/app/_hooks/useAlterModal';
import useSign from '@/app/(beforeLogin)/_hooks/useSign';
import IdentifierInput from '@/app/_component/_input/IdentifierInput';
import { useRouter } from 'next/navigation';

export default function LoginPhaseB() {
  const router = useRouter();
  const sign = useSign();
  const { alterMessage, sendPrepareMessage } = useAlterModal();
  const { state, dispatch } = useContext(LoginContext);
  const { id, password, options } = state;
  const [response, onSubmit] = useFormState(LoginAction, {
    message: 'idle',
  });

  useEffect(() => {
    switch (response.message) {
      case 'ok':
        dispatch({ type: 'setLoading', payload: true });
        sign.login(id.value, password.value, true);
        break;
      case 'invalid':
        alterMessage('Please enter correct input.');
        password.ref?.current?.focus();
        break;
      case 'incorrect':
        alterMessage('Incorrect password');
        password.ref?.current?.focus();
        break;
      case 'network_error':
        alterMessage('Network error. check your network');
        password.ref?.current?.focus();
        break;
      case 'bad_request':
      case 'server_error':
      case 'something_is_wrong':
        alterMessage('Sorry. please try again.');
        password.ref?.current?.focus();
        break;
      default:
        break;
    }
  }, [response]);

  useEffect(() => {
    const timer = setTimeout(() => {
      password.ref?.current?.focus();
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [password.ref]);

  return (
    <div className={cx(styles.slide, utils.slide_right_in)}>
      <form
        className={styles.slideFlex}
        action={onSubmit}
        onSubmit={() => {
          password.ref?.current?.blur();
        }}
      >
        <div className={styles.content}>
          <IdentifierInput
            type="text"
            name="id"
            placeholder="Please enter your Id."
            defaultValue={id.value}
            readOnly
          />
          <IdentifierInput
            ref={password.ref}
            type="password"
            name="password"
            placeholder="Please enter your Password."
            validate={{ allowBlank: true }}
            disabled={options.isLoading}
            onSuccess={(value) => {
              dispatch({
                type: 'setPassword',
                payload: { value, disabled: false },
              });
            }}
            onError={() => {
              dispatch({
                type: 'setPassword',
                payload: { disabled: true },
              });
            }}
          />
          <FlexButton
            type="submit"
            text="Login"
            isLoading={options.isLoading}
            disabled={password.disabled || options.isLoading}
          />
          <FlexButton
            theme="reverse"
            text="Forgot password?"
            onClick={() => {
              router.push('/i/flow/password_reset');
              // sendPrepareMessage();
            }}
          />
          <NoAccount />
        </div>
      </form>
    </div>
  );
}
