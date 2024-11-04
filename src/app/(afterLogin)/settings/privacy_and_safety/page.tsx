import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsPrivacyActivity from '@/app/(afterLogin)/settings/privacy_and_safety/_component/SettingsPrivacyActivity';
import SettingsPrivacyMore from '@/app/(afterLogin)/settings/privacy_and_safety/_component/SettingsPrivacyMore';
import SettingsPrivacyPersonalization from '@/app/(afterLogin)/settings/privacy_and_safety/_component/SettingsPrivacyPersonalization';
import DivideLine from '@/app/_component/_util/DivideLine';

export default function SettingsPrivacyPage() {
  const header = 'Privacy and safety';
  const inform = 'Manage what information you see and share on X.';
  return (
    <SettingsSubWrapper header={header}>
      <SettingsInform inform={inform} />
      <SettingsPrivacyActivity />
      <DivideLine />
      <SettingsPrivacyPersonalization />
      <DivideLine />
      <SettingsPrivacyMore />
    </SettingsSubWrapper>
  );
}
