'use client';

import styles from './iFlowAddPhone.verify.module.css';
import Text from '@/app/_component/_text/Text';
import IdentifierInput, {
  IdentifierInputRef,
} from '@/app/_component/_input/IdentifierInput';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import {
  FormEventHandler,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import useConfirmPassword from '@/app/(afterLogin)/settings/_hooks/useConfirmPassword';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { AdvancedUser } from '@/model/User';
import useBackRouter from '@/app/(afterLogin)/_hooks/useBackPrevPath';

interface Props {
  title?: string;
  sub?: string;
  onSuccess?: (user: AdvancedUser) => void;
  onChange?: (value: string) => void;
  noBtn?: boolean;
  btnText?: string;
  btnTheme?:
    | 'theme'
    | 'reverse'
    | 'white'
    | 'red'
    | 'primary'
    | 'secondary'
    | 'transparent';
}

export interface VerifyPasswordRef {
  submit: () => void;
  focus: () => void;
}

const VerifyPassword = forwardRef<VerifyPasswordRef, Props>(
  ({ title, sub, onSuccess, onChange, noBtn, btnText, btnTheme }, ref) => {
    const backRouter = useBackRouter();
    const { alterMessage } = useAlterModal();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const passwordRef = useRef<IdentifierInputRef>(null);

    const confirmMutation = useConfirmPassword();
    const onSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();

      if (password === '') {
        backRouter.back();
        return;
      }

      setLoading(true);
      confirmMutation.mutate(
        {
          password,
        },
        {
          onSuccess: (response) => {
            setLoading(false);
            if (typeof onSuccess === 'function') {
              onSuccess(response.data);
            }
          },
          onError: () => {
            alterMessage('Wrong password!');
            setPassword('');
            passwordRef.current?.focus();
            passwordRef.current?.setValue('');
            setLoading(false);
          },
        }
      );
    };

    const onChangePassword = (value: string) => {
      setPassword(value);

      if (typeof onChange === 'function') {
        onChange(value);
      }
    };

    useImperativeHandle(ref, () => ({
      submit: () => {
        formRef.current?.submit();
      },
      focus: () => {
        passwordRef.current?.focus();
      },
    }));

    return (
      <form ref={formRef} className={styles.column} onSubmit={onSubmitForm}>
        <div className={styles.head}>
          <div className={styles.margin}>
            <Text text={title} size="xxxxl" bold="bold" />
            <Text className={styles.sub} text={sub} theme="gray" />
          </div>
          <IdentifierInput
            ref={passwordRef}
            type="password"
            placeholder="Password"
            autoFocus
            onChange={onChangePassword}
          />
        </div>
        {!noBtn && (
          <div className={styles.footer}>
            <FlexButton
              type="submit"
              text={btnText ? btnText : password === '' ? 'Cancel' : 'Next'}
              theme={
                btnTheme ? btnTheme : password === '' ? 'reverse' : 'white'
              }
              disabled={loading}
              large
            />
          </div>
        )}
      </form>
    );
  }
);

export default VerifyPassword;
