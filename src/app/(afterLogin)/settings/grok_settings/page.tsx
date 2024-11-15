import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import GrokSettings from '@/app/(afterLogin)/settings/grok_settings/_component/GrokSettings';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Sharing / XClone',
};

export default function GrokSettingsPage() {
  const header = 'Data Sharing';
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <GrokSettings />
    </SettingsSubWrapper>
  );
}
