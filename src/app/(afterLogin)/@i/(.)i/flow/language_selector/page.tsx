import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import XLogoHeader from '@/app/(afterLogin)/@i/(.)i/_component/XLogoHeader';
import LanguageSelector from '@/app/(afterLogin)/@i/(.)i/flow/language_selector/_component/LanguageSelector';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Languages / XClone',
};

export default function IFlowLanguageSelectorSlot() {
  return (
    <IBackground>
      <IHeader noBtn>
        <XLogoHeader />
      </IHeader>
      <LanguageSelector />
    </IBackground>
  );
}
