import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsMutedWord from '@/app/(afterLogin)/settings/muted_keywords/_component/SettingsMutedWord';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add muted word / XClone',
};

export default function SettingsMutedWordPage() {
  const header = 'Add muted word';
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsMutedWord mode="add" />
    </SettingsSubWrapper>
  );
}
