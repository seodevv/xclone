import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsData from '@/app/(afterLogin)/settings/data/_component/SettingsData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data usage / XClone',
};

export default function SettingsDataPage() {
  const header = 'Data usage';
  const inform = 'Limit how X uses some of your network data on this device.';
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsInform inform={inform} />
      <SettingsData />
    </SettingsSubWrapper>
  );
}
