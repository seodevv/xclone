import IFlowTwoFactorAuthAppSlot from '@/app/(afterLogin)/@i/(.)i/flow/two-factor-auth-app-enrollment/page';
import PageFixedBackground from '@/app/(afterLogin)/_component/_page/PageFixedBackground';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Two-factor authentication / XClone',
};

export default function IFlowTwoFactorAuthAppPage() {
  return (
    <PageFixedBackground>
      <IFlowTwoFactorAuthAppSlot />
    </PageFixedBackground>
  );
}
