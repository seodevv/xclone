import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsDisplay from '@/app/(afterLogin)/settings/display/_component/SettingsDisplay';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Display / XClone',
};

export default function SettingsDisplayPage() {
  const header = 'Display';
  const inform =
    'Manage your font size, color, and background. These settings affect all the X accounts on this browser.';
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsInform inform={inform} />
      <SettingsDisplay />
    </SettingsSubWrapper>
  );
}
