import MyProfileHydrationBoundary from '@/app/(afterLogin)/_boundary/MyProfileHydrationBoundary';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsEmail from '@/app/(afterLogin)/settings/email/_component/SettingsEmail';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Change email / XClone',
};

export default function SettingsEmailPage() {
  const header = 'Change email';
  return (
    <MyProfileHydrationBoundary>
      <SettingsSubWrapper header={header} noBack={false}>
        <SettingsEmail />
      </SettingsSubWrapper>
    </MyProfileHydrationBoundary>
  );
}
