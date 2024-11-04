'use client';

import XLogoSvg from '@/app/_svg/logo/XLogoSvg';
import styles from './verifyAccount.module.css';
import Text from '@/app/_component/_text/Text';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import { FormEventHandler } from 'react';
import { useMyProfileQuery } from '@/app/(afterLogin)/_hooks/useMyProfileQuery';
import useAlterModal from '@/app/_hooks/useAlterModal';

export default function VerifyAccount() {
  const { data: user } = useMyProfileQuery();
  const { sendPrepareMessage } = useAlterModal();

  const onSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    sendPrepareMessage();
  };

  return (
    <form className={styles.container} onSubmit={onSubmitForm}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.svg}>
            <XLogoSvg width={48} />
          </div>
          <div className={styles.body}>
            <div className={styles.text}>
              <Text className={styles.title} size="xxxl" bold="bold">
                Verify it’s you
              </Text>
              <Text theme="gray">
                Help us keep your data safe. To verify your identity, we need to
                send you a verification code to{' '}
                {user?.data.id.substring(0, 2) + '****'}
                @xclone.com.
              </Text>
            </div>
            <div className={styles.button}>
              <FlexButton
                type="submit"
                theme="transparent"
                text="Send code"
                large
                underline
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
