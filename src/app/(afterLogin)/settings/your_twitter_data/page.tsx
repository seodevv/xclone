import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsYourTwitterData from '@/app/(afterLogin)/settings/your_twitter_data/_component/SettingsYourTwitterData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your X data / XClone',
};

export default function SettingsYourTwitterDataPage() {
  const header = 'Your X data';
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsYourTwitterData />
    </SettingsSubWrapper>
  );
}
