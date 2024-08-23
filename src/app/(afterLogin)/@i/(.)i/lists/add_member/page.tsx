import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import CloseButton from '@/app/(afterLogin)/_component/buttons/CloseButton';

export default function IListAddMemberSlot() {
  return (
    <IBackground>
      <CloseButton prevPath="/home" />
      <h1>This is /i/lists/add_member</h1>
    </IBackground>
  );
}
