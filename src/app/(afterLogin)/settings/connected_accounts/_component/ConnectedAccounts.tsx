'use client';

import styles from './connectedAccounts.module.css';
import GoogleSvg from '@/app/_svg/logo/GoogleSvg';
import Text from '@/app/_component/_text/Text';
import CircleCheck from '@/app/_svg/_settings/CircleCheck';
import TransitionTextButton from '@/app/(afterLogin)/_component/buttons/TransitionTextButton';
import { useRouter } from 'next/navigation';
import { useMyProfileQuery } from '@/app/(afterLogin)/_hooks/useMyProfileQuery';

export default function ConnectedAccounts() {
  const router = useRouter();
  const { data: user } = useMyProfileQuery();
  const onClickDisconnect = () => {
    router.push('/i/flow/sso_disconnect');
  };

  return (
    <div>
      <div className={styles.connected}>
        <div className={styles.logo}>
          <GoogleSvg width={18.75} />
        </div>
        <div className={styles.flex_column}>
          <Text>Google</Text>
          <div className={styles.flex_row}>
            <CircleCheck className={styles.svg} width={16.25} inherit />
            <Text className={styles.sub} size="xs" theme="green">
              Connected
            </Text>
          </div>
        </div>
        <Text>{user?.data.id}@gmail.com</Text>
      </div>
      <TransitionTextButton
        text="Disconnect"
        theme="error"
        align="center"
        onClick={onClickDisconnect}
      />
    </div>
  );
}
