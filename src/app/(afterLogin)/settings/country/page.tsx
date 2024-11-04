import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import ChangeCountry from '@/app/(afterLogin)/settings/country/_component/ChangeCountry';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Change country / XClone',
};

export default function SettingsCountryPage() {
  const header = 'Change country';

  return (
    <SettingsSubWrapper
      header={header}
      noBack={false}
      prevPath="/settings/your_twitter_data/account"
    >
      <ChangeCountry />
    </SettingsSubWrapper>
  );
}
