import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsPushNotifications from '@/app/(afterLogin)/settings/push_notifications/_component/SettingsPushNotifications';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Push notifications / XClone',
};

export default function SettingsPushNotificationsPage() {
  const header = 'Push notifications';
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsPushNotifications />
    </SettingsSubWrapper>
  );
}
