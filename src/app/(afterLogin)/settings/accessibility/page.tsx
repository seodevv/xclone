import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsAccessibility from '@/app/(afterLogin)/settings/accessibility/_component/SettingsAccessibility';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessiblity / XClone',
};

export default function SettingsAccessibilityPage() {
  const header = 'Accessiblity';
  const inform =
    'Manage aspects of your X experience such as limiting color contrast and motion. These settings affect all the X accounts on this browser.';
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsInform inform={inform} />
      <SettingsAccessibility />
    </SettingsSubWrapper>
  );
}
