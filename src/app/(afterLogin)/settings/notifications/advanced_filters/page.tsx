import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsNotificationsAdvancedFilters from '@/app/(afterLogin)/settings/notifications/advanced_filters/_component/SettingsNoticiationsAdvancedFilters';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Muted notifications / XClone',
};

export default function SettingsNotificationsAdvancedFiltersPage() {
  const header = 'Muted notifications';
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsNotificationsAdvancedFilters />
    </SettingsSubWrapper>
  );
}
