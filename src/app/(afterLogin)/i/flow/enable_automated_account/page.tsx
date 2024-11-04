import IFlowEnableAutoMatedAccountSlot from '@/app/(afterLogin)/@i/(.)i/flow/enable_automated_account/page';
import PageFixedBackground from '@/app/(afterLogin)/_component/_page/PageFixedBackground';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Automation / XClone',
};

export default function IFlowEnableAutomatedAccountPage() {
  return (
    <PageFixedBackground>
      <IFlowEnableAutoMatedAccountSlot />
    </PageFixedBackground>
  );
}
