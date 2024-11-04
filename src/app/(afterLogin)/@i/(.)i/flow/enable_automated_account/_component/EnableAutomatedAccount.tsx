'use client';

import Text from '@/app/_component/_text/Text';
import styles from './enableAutomatedAccount.module.css';
import IdentifierInput from '@/app/_component/_input/IdentifierInput';
import { FormEventHandler, useState } from 'react';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import useAlterModal from '@/app/_hooks/useAlterModal';

export default function EnableAutomatedAccount() {
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
        <div className={styles.padding}>
          <Text className={styles.title} size="xxxxl" bold="bold">
            To get started, first enter your managing account phone, email, or
            @username
          </Text>
          <IdentifierInput
            placeholder="Phone, email, or username"
            autoFocus
            onChange={onChangeInput}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <FlexButton
          type="submit"
          theme="white"
          text="Next"
          large
          disabled={input === ''}
        />
      </div>
    </form>
  );
}
