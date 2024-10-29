import IFlowLanguageSelectorSlot from '@/app/(afterLogin)/@i/(.)i/flow/language_selector/page';
import PageFixedBackground from '@/app/(afterLogin)/_component/_page/PageFixedBackground';

export default function IFlowLanguageSelectorPage() {
  return (
    <PageFixedBackground>
      <IFlowLanguageSelectorSlot />
    </PageFixedBackground>
  );
}
