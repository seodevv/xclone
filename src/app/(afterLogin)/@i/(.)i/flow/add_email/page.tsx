import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import XLogoHeader from '@/app/(afterLogin)/@i/(.)i/_component/XLogoHeader';
import IFlowAddEmailController from '@/app/(afterLogin)/@i/(.)i/flow/add_email/_component/IFlowAddEmailController';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Change email / XClone',
};

export default function IFlowAddEmailSlot() {
  return (
    <IBackground>
      <IHeader noBtn>
        <XLogoHeader />
      </IHeader>
      <IFlowAddEmailController />
    </IBackground>
  );
}
