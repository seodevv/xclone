import SettingSubWrapper from '@/app/(afterLogin)/settings/_component/SettingSubWrapper';
import SettingsAccount from '@/app/(afterLogin)/settings/your_twitter_data/account/_component/SettingsAccount';

export default function SettingsAccountPage() {
  const header = 'Account information';

  return (
    <SettingSubWrapper header={header} noBack={false}>
      <SettingsAccount />
    </SettingSubWrapper>
  );
}
