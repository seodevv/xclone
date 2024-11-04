import IFlowAddEmailSlot from '@/app/(afterLogin)/@i/(.)i/flow/add_email/page';
import PageFixedBackground from '@/app/(afterLogin)/_component/_page/PageFixedBackground';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Change email / XClone',
};

export default function IFlowAddPhonePage() {
  return (
    <PageFixedBackground>
      <IFlowAddEmailSlot />
    </PageFixedBackground>
  );
}
