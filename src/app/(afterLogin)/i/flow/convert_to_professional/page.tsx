import IFlowConvertToProfessionalSlot from '@/app/(afterLogin)/@i/(.)i/flow/convert_to_professional/page';
import PageFixedBackground from '@/app/(afterLogin)/_component/_page/PageFixedBackground';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'XClone',
};

export default function IFlowConvertToProfessionalPage() {
  return (
    <PageFixedBackground>
      <IFlowConvertToProfessionalSlot />
    </PageFixedBackground>
  );
}
