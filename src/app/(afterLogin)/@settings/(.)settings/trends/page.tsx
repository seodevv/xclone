import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import SettingsExplore from '@/app/(afterLogin)/@settings/(.)settings/explore/_component/SettingsExplore';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content you see / XClone',
};

export default function SettingsExploreSlot() {
  return (
    <IBackground>
      <IHeader title="Trends" align="left" />
      <SettingsExplore />
    </IBackground>
  );
}
