import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import YourAccountHistory from '@/app/(afterLogin)/settings/your_twitter_data/account_history/_component/YourAccountHistory';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account history / XClone',
};

export default function SettingsYourAccountHistoryPage() {
  const header = 'Account history';
  const prevPath = '/settings/account';

  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <YourAccountHistory />
    </SettingsSubWrapper>
  );
}
