'use client';

import styles from './settingsAccount.confirm.module.css';
import TextButton from '@/app/(afterLogin)/_component/buttons/TextButton';
import PageHeader from '@/app/(afterLogin)/_component/_page/PageHeader';
import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import IdentifierInput, {
  IdentifierInputRef,
} from '@/app/_component/_input/IdentifierInput';
import DivideLine from '@/app/_component/_util/DivideLine';
import { FormEventHandler, useRef, useState } from 'react';
import useConfirmPassword from '@/app/(afterLogin)/settings/_hooks/useConfirmPassword';
import { AdvancedUser } from '@/model/User';

interface Props {
  onSuccess: (user: AdvancedUser) => void;
}

export default function SettingsConfirm({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef<IdentifierInputRef>(null);
  const confirmMutation = useConfirmPassword();
  const title = 'Confirm your password';
  const inform = 'Please enter your password in order to get this.';

  const onChangePassword = (value: string) => {
    setPassword(value);
    passwordRef.current?.error({ flag: false });
  };
  const onSubmitConfirm: FormEventHandler = (e) => {
    e.preventDefault();
    if (password === '') return;
    setLoading(true);
    confirmMutation.mutate(
      { password },
      {
        onSuccess: (response) => {
          onSuccess(response.data);
        },
        onError: (error) => {
          passwordRef.current?.error({ flag: true, message: error.message });
        },
        onSettled: () => {
          setLoading(false);
        },
      }
    );
  };

  return (
    <>
      <PageHeader title={title} height={48} noBack />
      <SettingsInform inform={inform} />
      <DivideLine />
      <form onSubmit={onSubmitConfirm}>
        <div className={styles.input}>
          <IdentifierInput
            ref={passwordRef}
            type="password"
            placeholder="Password"
            passwordHide
            forgot
            autoFocus
            onChange={onChangePassword}
          />
        </div>
        <div className={styles.confirm}>
          <TextButton
            className={styles.button}
            type="submit"
            text="Confirm"
            theme="primary"
            loading={loading}
            disabled={!password}
          />
        </div>
      </form>
    </>
  );
}
