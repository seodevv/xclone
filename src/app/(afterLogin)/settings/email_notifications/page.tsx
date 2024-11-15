import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import EmailNotifications from '@/app/(afterLogin)/settings/email_notifications/_component/EmailNotifications';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Email notifications / XClone',
};

export default function SettingsEmailNotificationsPage() {
  const header = 'Email notifications';
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <EmailNotifications />
    </SettingsSubWrapper>
  );
}
