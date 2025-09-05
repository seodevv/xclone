import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import XLogoHeader from '@/app/(afterLogin)/@i/(.)i/_component/XLogoHeader';
import ConvertToProfessional from '@/app/(afterLogin)/@i/(.)i/flow/convert_to_professional/_components/ConvertToProfessional';
import HtmlOverflowHidden from '@/app/_component/_overflow/HtmlOverflowHidden';

export default function IFlowConvertToProfessionalSlot() {
  return (
    <IBackground maxHeight="90dvh">
      <HtmlOverflowHidden />
      <IHeader>
        <XLogoHeader />
      </IHeader>
      <ConvertToProfessional />
    </IBackground>
  );
}
