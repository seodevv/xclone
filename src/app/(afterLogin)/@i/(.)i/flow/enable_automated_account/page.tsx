import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import XLogoHeader from '@/app/(afterLogin)/@i/(.)i/_component/XLogoHeader';
import EnableAutomatedAccount from '@/app/(afterLogin)/@i/(.)i/flow/enable_automated_account/_component/EnableAutomatedAccount';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Automation / XClone',
};

export default function IFlowEnableAutoMatedAccountSlot() {
  return (
    <IBackground prevPath="/home">
      <IHeader>
        <XLogoHeader />
      </IHeader>
      <EnableAutomatedAccount />
    </IBackground>
  );
}
