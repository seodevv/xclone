import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import SettingsSearch from '@/app/(afterLogin)/@settings/(.)settings/search/_component/SettingsSearch';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content you see / XClone',
};

export default function SettingsSearchSlot() {
  return (
    <IBackground>
      <IHeader title="Search settings" />
      <SettingsSearch />
    </IBackground>
  );
}
