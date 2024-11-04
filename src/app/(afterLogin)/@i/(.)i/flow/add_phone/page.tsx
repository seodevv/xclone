import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import XLogoHeader from '@/app/(afterLogin)/@i/(.)i/_component/XLogoHeader';
import IFlowAddPhoneController from '@/app/(afterLogin)/@i/(.)i/flow/add_phone/_component/IFlowAddPhoneController';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Change phone / XClone',
};

export default function IFlowAddPhoneSlot() {
  return (
    <IBackground>
      <IHeader noBtn>
        <XLogoHeader />
      </IHeader>
      <IFlowAddPhoneController />
    </IBackground>
  );
}
