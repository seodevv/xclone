'use client';

import styles from './changePassword.module.css';
import utils from '@/app/utility.module.css';
import IdentifierInput, {
  IdentifierInputRef,
} from '@/app/_component/_input/IdentifierInput';
import DivideLine from '@/app/_component/_util/DivideLine';
import TextButton from '@/app/(afterLogin)/_component/buttons/TextButton';
import { FormEventHandler, useRef, useState } from 'react';
import { useChangePasswordMutation } from '@/app/(afterLogin)/settings/_hooks/useChangePasswordMutation';
import useAlterModal from '@/app/_hooks/useAlterModal';

export default function ChangePassword() {
  const [current, setCurrent] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const currentRef = useRef<IdentifierInputRef>(null);
  const newPasswordRef = useRef<IdentifierInputRef>(null);
  const confirmPasswordRef = useRef<IdentifierInputRef>(null);

  const [loading, setLoading] = useState(false);
  const { alterMessage } = useAlterModal();
  const changePasswordMutation = useChangePasswordMutation();
  const onSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (current === newPassword) {
      newPasswordRef.current?.error({
        flag: true,
        message: 'New password cannot be the same as your existing password.',
      });
      return;
    } else if (newPassword.length < 8) {
      newPasswordRef.current?.error({
        flag: true,
        message:
          'Your password needs to be at least 8 characters. Please enter a longer one.',
      });
      return;
    } else if (newPassword !== confirmPassword) {
      confirmPasswordRef.current?.error({
        flag: true,
        message: 'Passwords do not match.',
      });
      return;
    }

    setLoading(true);
    changePasswordMutation.mutate(
      {
        current,
        newPassword,
      },
      {
        onSuccess: () => {
          setLoading(false);
          alterMessage('Your password has been successfully updated.');
          setCurrent('');
          setNewPassword('');
          setConfirmPassword('');
        },
        onError: (error) => {
          setLoading(false);
          if (error.message === 'not-found') {
            currentRef.current?.error({
              flag: true,
              message: 'The password you entered was incorrect.',
            });
          } else {
            alterMessage('Something is wrong. Please try again', 'error');
          }
        },
      }
    );
  };
  const resetError = () => {
    currentRef.current?.error({ flag: false });
    newPasswordRef.current?.error({ flag: false });
    confirmPasswordRef.current?.error({ flag: false });
  };
  const onChangeCurrent = (value: string) => {
    setCurrent(value);
    resetError();
  };
  const onChangeNewPassword = (value: string) => {
    setNewPassword(value);
    resetError();
  };
  const onChangeConfirmPassword = (value: string) => {
    setConfirmPassword(value);
    resetError();
  };

  return (
    <form onSubmit={onSubmitForm}>
      <div className={utils.p_basic}>
        <IdentifierInput
          ref={currentRef}
          type="password"
          placeholder="Current password"
          defaultValue={current}
          passwordHide
          noPad
          withForgot
          onChange={onChangeCurrent}
        />
      </div>
      <DivideLine />
      <div className={utils.p_basic}>
        <IdentifierInput
          ref={newPasswordRef}
          type="password"
          placeholder="New password"
          defaultValue={newPassword}
          passwordHide
          noPad
          onChange={onChangeNewPassword}
        />
      </div>
      <div className={utils.p_basic}>
        <IdentifierInput
          ref={confirmPasswordRef}
          type="password"
          placeholder="Confirm password"
          defaultValue={confirmPassword}
          passwordHide
          noPad
          onChange={onChangeConfirmPassword}
        />
      </div>
      <DivideLine />
      <div className={styles.save}>
        <TextButton
          className={styles.button}
          type="submit"
          theme="primary"
          text="Save"
          loading={loading}
          disabled={
            current === '' || newPassword === '' || confirmPassword === ''
          }
        />
      </div>
    </form>
  );
}
