import styles from './connectedApps.page.module.css';
import utils from '@/app/utility.module.css';
import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import Link from 'next/link';
import Text from '@/app/_component/_text/Text';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apps and sessions / XClone',
};

export default function SettingsConnectedApps() {
  const header = 'Connected apps';
  return (
    <SettingsSubWrapper header={header} noBack={false}>
      <SettingsInform
        inform={
          <>
            These are the apps which you connected to your account. You can see
            the information these apps have access to and revoke access.&nbsp;
            <Link
              className={utils.link}
              href="https://help.x.com/managing-your-account/connect-or-revoke-access-to-third-party-apps"
              target="_blank"
            >
              Learn more
            </Link>
          </>
        }
      />
      <div className={styles.body}>
        <Text className={utils.mb_8} size="xxxxl" bold="bold">
          Manage connected apps in a flash
        </Text>
        <Text className={utils.mb_28} theme="gray">
          Third-party apps you allow to access your X account will show up here.
        </Text>
      </div>
    </SettingsSubWrapper>
  );
}
