import MyProfileHydrationBoundary from '@/app/(afterLogin)/_boundary/MyProfileHydrationBoundary';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import DeactivateController from '@/app/(afterLogin)/settings/deactivate/_component/DeactivateController';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deactivate account / XClone',
};

export default function SettingsDeactivate() {
  const header = 'Deactivate account';
  return (
    <MyProfileHydrationBoundary>
      <SettingsSubWrapper header={header} noBack={false}>
        <DeactivateController />
      </SettingsSubWrapper>
    </MyProfileHydrationBoundary>
  );
}
