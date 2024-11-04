'use client';

import styles from './deactivateInform.module.css';
import cx from 'classnames';
import Image from 'next/image';
import { generateImagePath } from '@/app/_lib/common';
import { AdvancedUser } from '@/model/User';
import Text from '@/app/_component/_text/Text';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Props {
  user: AdvancedUser;
  onClick?: () => void;
}

export default function DeactivateInform({ user, onClick }: Props) {
  const router = useRouter();

  const onClickProfile = () => {
    router.push(`/${user.id}`);
  };

  const onClickNext = () => {
    if (typeof onClick === 'function') {
      onClick();
    }
  };

  return (
    <div>
      <button className={styles.profile} onClick={onClickProfile}>
        <div className={styles.imageBox}>
          <div className={styles.pad}></div>
          <div className={cx(styles.absolute, styles.image)}>
            <Image
              src={generateImagePath(user.image)}
              alt={user.id}
              width={40}
              height={40}
            />
          </div>
        </div>
        <div className={styles.inform}>
          <Text>{user.nickname}</Text>
          <Text theme="gray">{`@${user.id}`}</Text>
        </div>
      </button>
      <Text className={styles.padding} size="xl" bold="boldest">
        This will deactivate your account
      </Text>
      <Text className={styles.padding} theme="gray" size="xs">
        You’re about to start the process of deactivating your X account. Your
        display name, @username, and public profile will no longer be viewable
        on X.com, X for iOS, or X for Android.
      </Text>
      <Text className={styles.padding} size="xl" bold="boldest">
        What else you should know
      </Text>
      <Text
        className={cx(styles.padding, styles.bd_bottom)}
        theme="gray"
        size="xs"
      >
        You can restore your X account if it was accidentally or wrongfully
        deactivated for up to 30 days after deactivation.
      </Text>
      <Text
        className={cx(styles.padding, styles.bd_bottom)}
        theme="gray"
        size="xs"
      >
        Some account information may still be available in search engines, such
        as Google or Bing.&nbsp;
        <Link
          className={styles.link}
          href="https://help.x.com/ko/safety-and-security/remove-x-profile-from-google-search"
          target="_blank"
        >
          Learn more
        </Link>
      </Text>
      <Text
        className={cx(styles.padding, styles.bd_bottom)}
        theme="gray"
        size="xs"
      >
        If you just want to change your @username, you don’t need to deactivate
        your account — edit it in your&nbsp;
        <Link
          className={styles.link}
          href="/settings/your_twitter_data/account"
        >
          settings
        </Link>
        .
      </Text>
      <Text
        className={cx(styles.padding, styles.bd_bottom)}
        theme="gray"
        size="xs"
      >
        To use your current @username or email address with a different X
        account,&nbsp;
        <Link
          className={styles.link}
          href="/settings/your_twitter_data/account"
        >
          change them
        </Link>
        &nbsp; before you deactivate this account.
      </Text>
      <Text
        className={cx(styles.padding, styles.bd_bottom)}
        theme="gray"
        size="xs"
      >
        If you want to download&nbsp;
        <Link className={styles.link} href="/settings/download_your_data">
          your X data
        </Link>
        , you’ll need to complete both the request and download process before
        deactivating your account. Links to download your data cannot be sent to
        deactivated accounts.
      </Text>
      <button type="button" className={styles.deactivate} onClick={onClickNext}>
        <Text theme="error">Deactivate</Text>
      </button>
    </div>
  );
}
