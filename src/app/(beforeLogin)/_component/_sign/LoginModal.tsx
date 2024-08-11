'use client';

import styles from './beforeLogin.sign.module.css';
import {
  FormEvent,
  FormEventHandler,
  MouseEvent,
  MouseEventHandler,
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import cx from 'classnames';
import GoogleLogin from '@/app/(beforeLogin)/_component/_right/GoogleLogin';
import GithubLogin from '@/app/(beforeLogin)/_component/_right/GithubLogin';
import IdentifierInput, {
  IdentifierInputRef,
} from '@/app/(beforeLogin)/_component/_sign/IdentifierInput';
import HorizontalRule from '@/app/(beforeLogin)/_component/_sign/HorizontalRule';
import NoAccount from '@/app/(beforeLogin)/_component/_sign/NoAccount';
import SignModalTitle from '@/app/(beforeLogin)/_component/_sign/_signup/SIgnModalTitle';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import useSign from '@/app/(beforeLogin)/_hooks/useSign';
import useAlterModal from '@/app/_hooks/useAlterModal';
import LoginModalHeader from '@/app/(beforeLogin)/_component/_sign/_login/LoginModalHeader';

interface InputState {
  value: string;
  disable: boolean;
  ref?: RefObject<IdentifierInputRef>;
}

export default function LoginModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sign = useSign();
  const { alterMessage } = useAlterModal();
  const [id, setId] = useState<InputState>({
    value: '',
    disable: true,
    ref: useRef<IdentifierInputRef>(null),
  });
  const [password, setPassword] = useState<InputState>({
    value: '',
    disable: true,
    ref: useRef<IdentifierInputRef>(null),
  });
  const [options, setOptions] = useState({
    from: false,
    isNext: false,
    isLoading: false,
    animation: false,
  });

  const next = async () => {
    if (disabledHandler('id')) return;

    setOptions((prev) => ({ ...prev, isLoading: true }));
    try {
      await sign.getAccount({ type: 'login', id: id.value });
      setOptions((prev) => ({
        ...prev,
        isLoading: false,
        isNext: true,
        animation: true,
      }));
    } catch (error) {
      setOptions((prev) => ({ ...prev, isLoading: false }));
      alterMessage('Sorry. Your account cannot be found.');
      setTimeout(() => id.ref?.current?.focus(), 50);
    }
  };

  const preventEvent = (e: MouseEvent | FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onClickNext: MouseEventHandler<HTMLButtonElement> = (e) => {
    preventEvent(e);
    next();
  };

  const onSubmitSign: FormEventHandler<HTMLFormElement> = async (e) => {
    if (disabledHandler('password')) return;

    preventEvent(e);
    password.ref?.current?.blur();
    setOptions((prev) => ({ ...prev, isLoading: true }));

    const response = await sign.login(id.value, password.value);
    if (response?.ok) {
      router.push('/home');
    } else {
      setOptions((prev) => ({ ...prev, isLoading: false }));
      alterMessage('Invalid password.');
      setTimeout(() => password.ref?.current?.focus(), 50);
    }
  };

  const disabledHandler = (type: 'id' | 'password') => {
    if (options.isLoading) return true;
    if (type === 'id' && id.disable) return true;
    if (type === 'password' && password.disable) return true;
    return false;
  };

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    router.refresh();
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (options.isNext) {
      setPassword((prev) => ({ ...prev, value: '' }));
      setTimeout(() => {
        password.ref?.current?.focus();
      }, 300);
    } else {
      setTimeout(() => {
        id.ref?.current?.focus();
      }, 300);
    }
  }, [options.isNext, setPassword]);

  useLayoutEffect(() => {
    if (searchParams.has('from')) {
      setOptions((prev) => ({ ...prev, from: true }));
    }
  }, [searchParams]);

  return (
    <>
      {!options.isNext ? (
        <div
          className={cx(
            styles.middleSlide,
            options.animation && styles.slideLeftIn
          )}
        >
          <div className={styles.middleFlex}>
            <div className={styles.middleContent}>
              <SignModalTitle />
              <div className={styles.middleOAtuh}>
                <GoogleLogin />
              </div>
              <div className={styles.middleOAtuh}>
                <GithubLogin />
              </div>
              <HorizontalRule text="OR" />
              <IdentifierInput
                ref={id.ref}
                type="text"
                placeholder="Please enter your ID."
                defaultValue={id.value}
                disabled={options.isLoading}
                onSuccess={(value) => {
                  setId((prev) => ({ ...prev, value, disable: false }));
                }}
                onError={() => setId((prev) => ({ ...prev, disable: true }))}
                onEnter={() => next()}
              />
              <FlexButton
                text="Next"
                onClick={onClickNext}
                isLoading={options.isLoading}
                disabled={disabledHandler('id')}
              />
              <FlexButton theme="reverse" text="Forgot password?" />
              <NoAccount />
            </div>
          </div>
        </div>
      ) : (
        <div className={cx(styles.middleSlide, styles.slideRightIn)}>
          <form className={styles.middleFlex} onSubmit={onSubmitSign}>
            <div className={styles.middleContent}>
              <IdentifierInput
                type="text"
                name="id"
                placeholder="Please enter your Id."
                defaultValue={id.value}
                disabled
              />
              <IdentifierInput
                ref={password.ref}
                type="password"
                name="password"
                placeholder="Please enter your Password."
                validate={{ allowEmpty: true }}
                disabled={options.isLoading}
                onSuccess={(value) => {
                  setPassword((prev) => ({
                    ...prev,
                    value,
                    disable: false,
                  }));
                }}
                onError={() =>
                  setPassword((prev) => ({ ...prev, disable: true }))
                }
              />
              <FlexButton
                type="submit"
                text="Login"
                isLoading={options.isLoading}
                disabled={disabledHandler('password')}
              />
              <FlexButton theme="reverse" text="Forgot password?" />
              <NoAccount />
            </div>
          </form>
        </div>
      )}
    </>
  );
}
