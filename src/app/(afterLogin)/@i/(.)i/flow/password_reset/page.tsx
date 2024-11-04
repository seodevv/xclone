import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import XLogoHeader from '@/app/(afterLogin)/@i/(.)i/_component/XLogoHeader';
import PasswordReset from '@/app/(afterLogin)/@i/(.)i/flow/password_reset/_component/PasswordReset';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password reset / XClone',
};

export default function IFlowPasswordResetSlot() {
  return (
    <IBackground prevPath="/home">
      <IHeader prevPath="/home">
        <XLogoHeader />
      </IHeader>
      <PasswordReset />
    </IBackground>
  );
}
