import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import ChangePassword from '@/app/(afterLogin)/settings/password/_component/ChangePassword';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Change your password / XClone',
};

export default function SettingsPasswordPage() {
  const header = 'Change your password';
  return (
    <SettingsSubWrapper header={header} noBack={false}>
      <ChangePassword />
    </SettingsSubWrapper>
  );
}
