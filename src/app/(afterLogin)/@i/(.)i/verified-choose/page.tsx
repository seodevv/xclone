import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import VerifiedChoose from '@/app/(afterLogin)/@i/(.)i/verified-choose/_component/VerifiedChoose';

export default function IVerifiedChooseSlot() {
  return (
    <IBackground height="auto">
      <IHeader />
      <VerifiedChoose />
    </IBackground>
  );
}
