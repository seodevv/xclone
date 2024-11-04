'use client';

import styles from './iFlowAddPhone.verify.module.css';
import Text from '@/app/_component/_text/Text';
import IdentifierInput, {
  IdentifierInputRef,
} from '@/app/_component/_input/IdentifierInput';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import { FormEventHandler, useRef, useState } from 'react';
import useConfirmPassword from '@/app/(afterLogin)/settings/_hooks/useConfirmPassword';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { AdvancedUser } from '@/model/User';
import useBackRouter from '@/app/(afterLogin)/_hooks/useBackPrevPath';

interface Props {
  title?: string;
  sub?: string;
  onSuccess?: (user: AdvancedUser) => void;
}

export default function VerifyPassword({
  title = 'Verify your password',
  sub = 'Re-enter your X password to continue.',
  onSuccess,
}: Props) {
  const backRouter = useBackRouter();
  const { alterMessage } = useAlterModal();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
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

  return (
    <form className={styles.column} onSubmit={onSubmitForm}>
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
          onChange={(value) => {
            setPassword(value);
          }}
        />
      </div>
      <div className={styles.footer}>
        <FlexButton
          type="submit"
          text={password === '' ? 'Cancel' : 'Next'}
          theme={password === '' ? 'reverse' : 'white'}
          disabled={loading}
          large
        />
      </div>
    </form>
  );
}
