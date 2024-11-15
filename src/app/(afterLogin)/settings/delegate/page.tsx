import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsDelegate from '@/app/(afterLogin)/settings/delegate/_component/SettingsDelegate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delegate / XClone',
};

export default function SettingsDelegatePage() {
  const header = 'Delegate';
  const inform = 'Share an account with people who have delegated roles.';
  return (
    <SettingsSubWrapper header={header} noBack={false}>
      <SettingsInform inform={inform} />
      <SettingsDelegate />
    </SettingsSubWrapper>
  );
}
