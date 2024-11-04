import MyProfileHydrationBoundary from '@/app/(afterLogin)/_boundary/MyProfileHydrationBoundary';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import YourAge from '@/app/(afterLogin)/settings/your_twitter_data/age/_component/YourAge';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Age / XClone',
};

export default function SettingsYourAgePage() {
  const header = 'Age';
  return (
    <MyProfileHydrationBoundary>
      <SettingsSubWrapper
        header={header}
        noBack={false}
        prevPath="/settings/account"
      >
        <YourAge />
      </SettingsSubWrapper>
    </MyProfileHydrationBoundary>
  );
}
