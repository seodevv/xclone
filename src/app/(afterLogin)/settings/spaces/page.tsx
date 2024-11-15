import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsSpaces from '@/app/(afterLogin)/settings/spaces/_component/SettingsSpaces';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spaces / XClone',
};

export default function SettingsSpacesPage() {
  const header = 'Spaces';
  const inform = 'Manage who can see your Spaces listening activity';
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsInform inform={inform} />
      <SettingsSpaces />
    </SettingsSubWrapper>
  );
}
