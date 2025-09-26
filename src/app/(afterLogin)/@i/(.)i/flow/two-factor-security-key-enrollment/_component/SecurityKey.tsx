'use client';

import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import styles from './securityKey.module.css';
import cx from 'classnames';
import { FormEventHandler } from 'react';
import Image from 'next/image';
import Key from '/public/keys_v1.png';
import Text from '@/app/_component/_text/Text';
import OrderList, {
  IOrderList,
} from '@/app/(afterLogin)/_component/_list/OrderList';
import useAlterModal from '@/app/_hooks/useAlterModal';

export default function SecurityKey() {
  const { sendPrepareMessage } = useAlterModal();

  const orderList: IOrderList[] = [
    {
      title: 'Sync your security key',
      sub: 'You can either insert the key into the USB port of your computer, or sync it over your computer’s Bluetooth or NFC.',
    },
    {
      title: 'Name your key',
      sub: 'This makes it easier for you to keep track of multiple security keys.',
    },
  ];

  const onSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    sendPrepareMessage();
  };

  return (
    <form
      className={cx(styles.flex_column, styles.form)}
      onSubmit={onSubmitForm}
    >
      <div className={cx(styles.flex_column, styles.body)}>
        <div className={styles.flex_column}>
          <div className={styles.imageBox}>
            <div className={styles.pad}></div>
            <div className={styles.absolute}>
              <Image className={styles.image} src={Key} alt="key" />
            </div>
          </div>
          <Text className={styles.title} size="xxxxl" bold="bold">
            Protect your account in just two steps
          </Text>
          <OrderList data={orderList} size="small" align="center" />
        </div>
        <div></div>
      </div>
      <div className={styles.footer}>
        <FlexButton type="submit" theme="theme" text="Get started" large />
      </div>
    </form>
  );
}
