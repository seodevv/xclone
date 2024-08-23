import CloseButton from '@/app/(afterLogin)/_component/buttons/CloseButton';
import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';

export default function PremiumSignUpSlot() {
  return (
    <IBackground>
      <CloseButton prevPath="/home" />
      <h1>This is /i/premium_sign_up slot</h1>
    </IBackground>
  );
}
