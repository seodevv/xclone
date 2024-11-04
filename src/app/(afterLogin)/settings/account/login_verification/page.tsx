import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import LoginVerification from '@/app/(afterLogin)/settings/account/login_verification/LoginVerification';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Two-factor authentication / XClone',
};

export default function SettingsLoginVerificationPage() {
  const header = 'Two-factor authentication';
  return (
    <SettingsSubWrapper header={header} noBack={false}>
      <LoginVerification />
    </SettingsSubWrapper>
  );
}
