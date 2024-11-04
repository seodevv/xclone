import utils from '@/app/utility.module.css';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import Link from 'next/link';
import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import { Metadata } from 'next';
import LoginHistory from '@/app/(afterLogin)/settings/your_twitter_data/login_history/_component/LoginHistory';

export const metadata: Metadata = {
  title: 'Account access history / XClone',
};

export default function SettingsYourLoginHistoryPage() {
  const header = 'Account access history';
  const inform = (
    <>
      If you see any suspicious activity from an app, go to&nbsp;
      <Link className={utils.link} href="/settings/connected_apps">
        Connected apps
      </Link>
      &nbsp;to revoke its access. In some cases the IP location may differ from
      your physical location.&nbsp;
      <Link
        className={utils.link}
        href="https://help.x.com/managing-your-account/accessing-your-x-data"
        target="_blank"
      >
        Learn more
      </Link>
    </>
  );
  return (
    <SettingsSubWrapper header={header} noBack={false}>
      <SettingsInform inform={inform} />
      <LoginHistory />
    </SettingsSubWrapper>
  );
}
