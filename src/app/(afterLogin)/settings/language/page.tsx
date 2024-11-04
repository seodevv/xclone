import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import ChangeDisplayLanguage from '@/app/(afterLogin)/settings/language/_component/ChangeDisplayLanguage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Change display language / XClone',
};

export default function SettingsLanguagePage() {
  const header = 'Change display language';
  return (
    <SettingsSubWrapper header={header} noBack={false}>
      <ChangeDisplayLanguage />
    </SettingsSubWrapper>
  );
}
