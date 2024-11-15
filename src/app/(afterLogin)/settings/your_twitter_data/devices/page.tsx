import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import { Metadata } from 'next';
import YourDevices from '@/app/(afterLogin)/settings/your_twitter_data/devices/_component/YourDevices';

export const metadata: Metadata = {
  title: 'Logged-in devices and apps / XClone',
};

export default function SettingsYourDevicesPage() {
  const header = 'Logged-in devices and apps';
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <YourDevices />
    </SettingsSubWrapper>
  );
}
