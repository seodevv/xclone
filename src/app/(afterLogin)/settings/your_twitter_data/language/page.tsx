import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import YourLanguage from '@/app/(afterLogin)/settings/your_twitter_data/language/_component/YourLanguage';

export const metadata = {
  title: 'Language / XClone',
};

export default function SettingsYourLanguagePage() {
  const header = 'Language';
  return (
    <SettingsSubWrapper
      header={header}
      noBack={false}
      prevPath="/settings/account"
    >
      <YourLanguage />
    </SettingsSubWrapper>
  );
}
