'use client';

import Text from '@/app/_component/_text/Text';
import utils from '@/app/utility.module.css';
import styles from './passwordReset.module.css';
import IdentifierInput from '@/app/_component/_input/IdentifierInput';
import { FormEventHandler, useState } from 'react';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import useAlterModal from '@/app/_hooks/useAlterModal';

export default function PasswordReset() {
  const { sendPrepareMessage } = useAlterModal();
  const [input, setInput] = useState('');

  const onSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    sendPrepareMessage();
  };

  const onChangeInput = (value: string) => {
    setInput(value);
  };

  return (
    <form className={styles.container} onSubmit={onSubmitForm}>
      <div className={styles.body}>
        <div className={styles.inner}>
          <Text size="xxxxl" bold="bold">
            Find you X account
          </Text>
          <Text className={utils.mt_8} theme="gray">
            Enter the email, phone number, or username associated with your
            account to change your password.
          </Text>
        </div>
        <div className={styles.input}>
          <IdentifierInput
            placeholder="Email, phone number, or username"
            autoFocus
            onChange={onChangeInput}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <FlexButton type="submit" text="Next" disabled={input === ''} large />
      </div>
    </form>
  );
}
