import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import XLogoHeader from '@/app/(afterLogin)/@i/(.)i/_component/XLogoHeader';
import TwoFactorAuthAppController from '@/app/(afterLogin)/@i/(.)i/flow/two-factor-auth-app-enrollment/_component/TwoFactorAuthAppController';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Two-factor authentication / XClone',
};

export default function IFlowTwoFactorAuthAppSlot() {
  return (
    <IBackground>
      <IHeader>
        <XLogoHeader />
      </IHeader>
      <TwoFactorAuthAppController />
    </IBackground>
  );
}
