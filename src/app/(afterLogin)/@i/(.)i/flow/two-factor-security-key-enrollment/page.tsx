import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import XLogoHeader from '@/app/(afterLogin)/@i/(.)i/_component/XLogoHeader';
import SecurityKeyController from '@/app/(afterLogin)/@i/(.)i/flow/two-factor-security-key-enrollment/_component/SecurityKeyController';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Two-factor authentication / XClone',
};

export default function IFlowTwoFactorSecurityKeySlot() {
  return (
    <IBackground>
      <IHeader>
        <XLogoHeader />
      </IHeader>
      <SecurityKeyController />
    </IBackground>
  );
}
