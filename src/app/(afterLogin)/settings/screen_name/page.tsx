import MyProfileHydrationBoundary from '@/app/(afterLogin)/_boundary/MyProfileHydrationBoundary';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsScreenName from '@/app/(afterLogin)/settings/screen_name/_component/SettingsScreenName';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Change username / XClone',
};

export default function SettingsScreenNamePage() {
  const header = 'Change username';

  return (
    <MyProfileHydrationBoundary>
      <SettingsSubWrapper
        header={header}
        noBack={false}
        prevPath="/settings/your_twitter_data/account"
      >
        <SettingsScreenName />
      </SettingsSubWrapper>
    </MyProfileHydrationBoundary>
  );
}
