import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import XLogoHeader from '@/app/(afterLogin)/@i/(.)i/_component/XLogoHeader';
import SSODisconnectController from '@/app/(afterLogin)/@i/(.)i/flow/sso_disconnect/_component/SSODisconnectController';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connected accounts / XClone',
};

export default function IFlowSSODisconnectSlot() {
  return (
    <IBackground>
      <IHeader>
        <XLogoHeader />
      </IHeader>
      <SSODisconnectController />
    </IBackground>
  );
}
