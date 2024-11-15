import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsNotificationsFilters from '@/app/(afterLogin)/settings/notifications/filters/_component/SettingsNotificationsFilters';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Filters / XClone',
};

export default function SettingsNotificationsFiltersPage() {
  const header = 'Filters';
  const inform =
    'Choose the notifications you’d like to see — and those you don’t.';
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsInform inform={inform} />
      <SettingsNotificationsFilters />
    </SettingsSubWrapper>
  );
}
