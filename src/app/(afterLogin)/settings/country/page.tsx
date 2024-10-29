import SettingSubWrapper from '@/app/(afterLogin)/settings/_component/SettingSubWrapper';
import ChangeCountry from '@/app/(afterLogin)/settings/country/_component/ChangeCountry';

export default function SettingsCountryPage() {
  const header = 'Change country';

  return (
    <SettingSubWrapper
      header={header}
      noBack={false}
      prevPath="/settings/your_twitter_data/account"
    >
      <ChangeCountry />
    </SettingSubWrapper>
  );
}
