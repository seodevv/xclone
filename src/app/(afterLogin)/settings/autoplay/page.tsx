import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsAutoplay from '@/app/(afterLogin)/settings/autoplay/_component/SettingsAutoplay';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Autoplay / XClone',
};

export default function SettingsAutoplayPage() {
  const header = 'Autoplay';
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsAutoplay />
    </SettingsSubWrapper>
  );
}
