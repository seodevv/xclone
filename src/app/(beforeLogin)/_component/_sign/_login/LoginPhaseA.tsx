'use client';

import styles from './beforeLogin.login.module.css';
import utils from '@/app/utility.module.css';
import { useContext, useEffect } from 'react';
import { useFormState } from 'react-dom';
import cx from 'classnames';
import { LoginContext } from '@/app/(beforeLogin)/_component/_sign/_login/LoginProvider';
import SignModalTitle from '@/app/(beforeLogin)/_component/_sign/_signup/SIgnModalTitle';
import GoogleLogin from '@/app/(beforeLogin)/_component/_right/GoogleLogin';
import GithubLogin from '@/app/(beforeLogin)/_component/_right/GithubLogin';
import HorizontalRule from '@/app/(beforeLogin)/_component/_sign/HorizontalRule';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import NoAccount from '@/app/(beforeLogin)/_component/_sign/_login/NoAccount';
import useAlterModal from '@/app/_hooks/useAlterModal';
import AccountAction from '@/app/(beforeLogin)/_component/_sign/_login/AccountAction';
import IdentifierInput from '@/app/_component/_input/IdentifierInput';

export default function LoginPhaseA() {
  const { alterMessage } = useAlterModal();
  const { state, dispatch } = useContext(LoginContext);
  const { id, options } = state;
  const [response, formAction] = useFormState(AccountAction, {
    message: 'idle',
  });

  useEffect(() => {
    switch (response.message) {
      case 'ok':
        dispatch({
          type: 'setOptions',
          payload: {
            prevPage: options.page,
            page: options.page + 1,
            animated: true,
          },
        });
        break;
      case 'invalid':
        alterMessage('Please enter correct input.');
        id.ref?.current?.focus();
        break;
      case 'network_error':
        alterMessage('Network error. check your network');
        id.ref?.current?.focus();
        break;
      case 'not_found':
        alterMessage('Sorry, we could not find your account.');
        id.ref?.current?.focus();
        break;
      case 'bad_request':
      case 'something_is_wrong':
        alterMessage('Sorry. please try again.');
        id.ref?.current?.focus();
        break;
      default:
        break;
    }
  }, [response]);

  useEffect(() => {
    const timer = setTimeout(() => {
      id.ref?.current?.focus();
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [id.ref]);

  return (
    <div className={cx(styles.slide, options.animated && utils.slide_left_in)}>
      <form className={styles.slideFlex} action={formAction}>
        <div className={styles.content}>
          <SignModalTitle />
          <div className={styles.oauth}>
            <GoogleLogin />
          </div>
          <div className={styles.oauth}>
            <GithubLogin />
          </div>
          <HorizontalRule text="OR" />
          <IdentifierInput
            ref={id.ref}
            type="text"
            name="id"
            placeholder="Please enter your ID."
            defaultValue={id.value}
            disabled={options.isLoading}
            onSuccess={(value) => {
              dispatch({ type: 'setId', payload: { value, disabled: false } });
            }}
            onError={() => {
              dispatch({ type: 'setId', payload: { disabled: true } });
            }}
          />
          <FlexButton
            type="submit"
            text="Next"
            isLoading={options.isLoading}
            disabled={id.disabled || options.isLoading}
          />
          <FlexButton theme="reverse" text="Forgot password?" />
          <NoAccount />
        </div>
      </form>
    </div>
  );
}
