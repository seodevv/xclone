import IFlowAddPhoneSlot from '@/app/(afterLogin)/@i/(.)i/flow/add_phone/page';
import PageFixedBackground from '@/app/(afterLogin)/_component/_page/PageFixedBackground';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Change phone / XClone',
};

export default function IFlowAddPhonePage() {
  return (
    <PageFixedBackground>
      <IFlowAddPhoneSlot />
    </PageFixedBackground>
  );
}
