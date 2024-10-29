import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import XLogoHeader from '@/app/(afterLogin)/@i/(.)i/_component/XLogoHeader';
import IFlowAddEmailController from '@/app/(afterLogin)/@i/(.)i/flow/add_email/_component/IFlowAddEmailController';

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
