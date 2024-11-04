import MyProfileHydrationBoundary from '@/app/(afterLogin)/_boundary/MyProfileHydrationBoundary';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsAccount from '@/app/(afterLogin)/settings/your_twitter_data/account/_component/SettingsAccount';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account information / XClone',
};

export default function SettingsAccountPage() {
  const header = 'Account information';

  return (
    <MyProfileHydrationBoundary>
      <SettingsSubWrapper header={header} noBack={false}>
        <SettingsAccount />
      </SettingsSubWrapper>
    </MyProfileHydrationBoundary>
  );
}
