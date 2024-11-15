import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsContacts from '@/app/(afterLogin)/settings/contacts/_component/SettingsContacts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discoverability and contacts / XClone',
};

export default function SettingsContactsPage() {
  const header = 'Discoverability and contacts';
  const inform =
    'Control your discoverability settings and manage contacts you’ve imported.';
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsInform inform={inform} />
      <SettingsContacts />
    </SettingsSubWrapper>
  );
}
