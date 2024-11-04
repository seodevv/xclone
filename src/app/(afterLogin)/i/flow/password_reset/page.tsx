import IFlowPasswordResetSlot from '@/app/(afterLogin)/@i/(.)i/flow/password_reset/page';
import PageFixedBackground from '@/app/(afterLogin)/_component/_page/PageFixedBackground';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password reset / XClone',
};

export default function IFlowPasswordResetPage() {
  return (
    <PageFixedBackground>
      <IFlowPasswordResetSlot />
    </PageFixedBackground>
  );
}
