'use client';

import styles from './twoFactorAuthApp.module.css';
import cx from 'classnames';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import { FormEventHandler } from 'react';
import Image from 'next/image';
import Shield from '/public/shield_v1.png';
import Text from '@/app/_component/_text/Text';
import OrderList, {
  IOrderList,
} from '@/app/(afterLogin)/_component/_list/OrderList';
import useAlterModal from '@/app/_hooks/useAlterModal';

export default function TwoFactorAuthApp() {
  const { sendPrepareMessage } = useAlterModal();

  const orderList: IOrderList[] = [
    {
      title: 'Link an authentication app to your X account',
      sub: 'Use a compatible authentication app (like Google Authenticator, Authy, Duo Mobile, 1Password, etc.) We’ll generate a QR code for you to scan.',
    },
    {
      title: 'Enter the confirmation code',
      sub: 'Two-factor authentication will then be turned on for authentication app, which you can turn off at any time.',
    },
  ];

  const onSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    sendPrepareMessage();
  };

  return (
    <form
      className={cx(styles.flex_column, styles.container)}
      onSubmit={onSubmitForm}
    >
      <div className={cx(styles.flex_column, styles.body)}>
        <div className={styles.flex_column}>
          <div className={styles.imageBox}>
            <div className={styles.pad}></div>
            <div className={styles.absolute}>
              <Image className={styles.image} src={Shield} alt="shield" />
            </div>
          </div>
          <Text className={styles.title} size="xxxxl" bold="bold">
            Protect your account in just two steps
          </Text>
        </div>
        <div className={styles.flex_column}>
          <OrderList data={orderList} size="small" align="center" />
        </div>
      </div>
      <div className={styles.footer}>
        <FlexButton type="submit" text="Get started" theme="theme" large />
      </div>
    </form>
  );
}
