import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import IFlowVerifyAccountController from '@/app/(afterLogin)/@i/(.)i/flow/verify_account_ownership/_component/IFlowVerifyAccountController';
import MyProfileHydrationBoundary from '@/app/(afterLogin)/_boundary/MyProfileHydrationBoundary';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download an archive of your data / XClone',
};

export default function IFlowVerifyAccountSlot() {
  const prevPath = '/home';
  return (
    <MyProfileHydrationBoundary>
      <IBackground prevPath={prevPath}>
        <IHeader prevPath={prevPath} noBtn />
        <IFlowVerifyAccountController />
      </IBackground>
    </MyProfileHydrationBoundary>
  );
}
