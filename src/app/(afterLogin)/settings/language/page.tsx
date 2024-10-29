import SettingSubWrapper from '@/app/(afterLogin)/settings/_component/SettingSubWrapper';
import ChangeDisplayLanguage from '@/app/(afterLogin)/settings/language/_component/ChangeDisplayLanguage';

export default function SettingsLanguagePage() {
  const header = 'Change display language';
  return (
    <SettingSubWrapper header={header} noBack={false}>
      <ChangeDisplayLanguage />
    </SettingSubWrapper>
  );
}
