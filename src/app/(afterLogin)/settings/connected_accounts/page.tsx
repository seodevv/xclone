import MyProfileHydrationBoundary from '@/app/(afterLogin)/_boundary/MyProfileHydrationBoundary';
import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import ConnectedAccounts from '@/app/(afterLogin)/settings/connected_accounts/_component/ConnectedAccounts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connected accounts / XClone',
};

export default function SettingsConnectedAccountsPage() {
  const header = 'Connected accounts';
  const inform =
    'These are the social accounts you connected to your X account to log in. You can disable access here.';
  return (
    <MyProfileHydrationBoundary>
      <SettingsSubWrapper header={header} noBack={false}>
        <SettingsInform inform={inform} />
        <ConnectedAccounts />
      </SettingsSubWrapper>
    </MyProfileHydrationBoundary>
  );
}
