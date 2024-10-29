import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingSubWrapper from '@/app/(afterLogin)/settings/_component/SettingSubWrapper';
import AdditionalLanguages from '@/app/(afterLogin)/settings/languages/_component/AdditionalLanguages';
import DisplayLanguage from '@/app/(afterLogin)/settings/languages/_component/DisplayLanguage';
import KnowLanguages from '@/app/(afterLogin)/settings/languages/_component/KnowLanguages';

export const metadata = {
  title: 'Languages / XClone',
};

export default function SettingsLanguagesPage() {
  const header = 'Languages';
  const inform =
    'Manage which languages are used to personalize your X experience.';
  return (
    <SettingSubWrapper
      header={header}
      noBack={false}
      prevPath="/settings/account"
    >
      <SettingsInform inform={inform} />
      <DisplayLanguage />
      <AdditionalLanguages />
      <KnowLanguages />
    </SettingSubWrapper>
  );
}
