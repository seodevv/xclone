import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import IKeyboardShortcut from '@/app/(afterLogin)/@i/(.)i/keyboard_shortcuts/_component/IKeyboardShortcuts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessibility, display and languages / XClone',
};

export default function IKeyboardShortcutsSlot() {
  return (
    <IBackground size="large">
      <IHeader title="Keyboard shortcuts" align="left" noMax />
      <IKeyboardShortcut />
    </IBackground>
  );
}
