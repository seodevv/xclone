import SettingSubWrapper from '@/app/(afterLogin)/settings/_component/SettingSubWrapper';
import YourLanguage from '@/app/(afterLogin)/settings/your_twitter_data/language/_component/YourLanguage';

export const metadata = {
  title: 'Language / XClone',
};

export default function SettingsYourLanguagePage() {
  const header = 'Language';
  return (
    <SettingSubWrapper
      header={header}
      noBack={false}
      prevPath="/settings/account"
    >
      <YourLanguage />
    </SettingSubWrapper>
  );
}
