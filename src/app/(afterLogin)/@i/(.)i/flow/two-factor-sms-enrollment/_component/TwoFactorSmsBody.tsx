'use client';

import Image from 'next/image';
import styles from './twoFactorSms.body.module.css';
import Hat from '/public/hardhat_v1.png';
import Text from '@/app/_component/_text/Text';
import Link from 'next/link';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { FormEventHandler } from 'react';

export default function TwoFactorSmsBody() {
  const { sendPrepareMessage } = useAlterModal();

  const onSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    sendPrepareMessage();
  };

  return (
    <form className={styles.form} onSubmit={onSubmitForm}>
      <div className={styles.container}>
        <div className={styles.flex}>
          <div className={styles.imageBox}>
            <div className={styles.cap}>
              <div className={styles.pad}></div>
              <div className={styles.absolute}>
                <Image
                  className={styles.image}
                  src={Hat}
                  alt="hat"
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </div>
          <div className={styles.desc}>
            <div className={styles.text}>
              <Text className={styles.big} size="xxxl" bold="boldest">
                Choose a different verification method
              </Text>
              <Text theme="gray">
                This two-factor authentication method is only available to
                Premium subscribers. Please select a different method.&nbsp;
                <Link
                  className={styles.link}
                  href="https://help.x.com/managing-your-account/two-factor-authentication"
                  target="_blank"
                >
                  Learn more
                </Link>
                &nbsp;about two-factor authentication.
              </Text>
            </div>
            <div>
              <FlexButton type="submit" theme="theme" text="Got it" large />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
