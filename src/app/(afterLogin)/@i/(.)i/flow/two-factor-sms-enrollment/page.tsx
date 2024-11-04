import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import TwoFactorSmsBody from '@/app/(afterLogin)/@i/(.)i/flow/two-factor-sms-enrollment/_component/TwoFactorSmsBody';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Two-factor authentication / XClone',
};

export default function IFlowTwoFactorSmsSlot() {
  return (
    <IBackground>
      <IHeader />
      <TwoFactorSmsBody />
    </IBackground>
  );
}
