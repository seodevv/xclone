import IFlowLanguageSelectorSlot from '@/app/(afterLogin)/@i/(.)i/flow/language_selector/page';
import PageFixedBackground from '@/app/(afterLogin)/_component/_page/PageFixedBackground';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Languages / XClone',
};

export default function IFlowLanguageSelectorPage() {
  return (
    <PageFixedBackground>
      <IFlowLanguageSelectorSlot />
    </PageFixedBackground>
  );
}
