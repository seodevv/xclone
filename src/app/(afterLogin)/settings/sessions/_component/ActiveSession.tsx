import styles from './activeSession.module.css';
import utils from '@/app/utility.module.css';
import SettingsSubMenu from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import Text from '@/app/_component/_text/Text';
import DesktopSvg from '@/app/_svg/_settings/DesktopSvg';
import { generateRandomString } from '@/app/_lib/common';

export default function ActiveSession() {
  const randomString = generateRandomString(36);

  return (
    <div>
      <Text className={utils.p_basic} size="xl" bold="bold">
        Current active session
      </Text>
      <Text className={utils.p_basic} size="xs" theme="gray">
        You’re logged into this X account on this device and are currently using
        it.
      </Text>
      <SettingsSubMenu
        type="link"
        href={`/settings/sessions/${randomString}`}
        svg={
          <div className={styles.desktop}>
            <DesktopSvg theme="theme" />
          </div>
        }
        title="Windows"
        sub={
          <>
            Republic of Koreaㆍ<div className={utils.badge}>Active now</div>
          </>
        }
      />
    </div>
  );
}
