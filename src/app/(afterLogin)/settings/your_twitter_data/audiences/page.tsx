import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import YourAudiences from '@/app/(afterLogin)/settings/your_twitter_data/audiences/_component/YourAudiences';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your advertiser list / XClone',
};

export default function SettingsYourAudiencesPage() {
  const header = 'Your advertiser list';
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <YourAudiences />
    </SettingsSubWrapper>
  );
}
