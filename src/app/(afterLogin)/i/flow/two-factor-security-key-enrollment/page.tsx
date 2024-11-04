import IFlowTwoFactorSecurityKeySlot from '@/app/(afterLogin)/@i/(.)i/flow/two-factor-security-key-enrollment/page';
import PageFixedBackground from '@/app/(afterLogin)/_component/_page/PageFixedBackground';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Two-factor authentication / XClone',
};

export default function IFlowTwoFactorSecurityKeyPage() {
  return (
    <PageFixedBackground>
      <IFlowTwoFactorSecurityKeySlot />
    </PageFixedBackground>
  );
}
