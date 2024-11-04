import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import ChangeCountryModal from '@/app/(afterLogin)/@i/(.)i/flow/settings/change_country/_component/ChangeCountryModal';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Change country / XClone',
};

export default function IFlowSettingsChangeCountrySlot() {
  return (
    <IBackground prevPath="/settings/country">
      <ChangeCountryModal />
    </IBackground>
  );
}
