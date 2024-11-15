import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import { Metadata } from 'next';
import SettingsContactsDashboard from '@/app/(afterLogin)/settings/contacts_dashboard/_component/SettingsContactsDashboard';

export const metadata: Metadata = {
  title: 'Manage contacts / XClone',
};

export default function SettingsContactsDashboardPage() {
  const header = 'Manage contacts';

  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsContactsDashboard />
    </SettingsSubWrapper>
  );
}
