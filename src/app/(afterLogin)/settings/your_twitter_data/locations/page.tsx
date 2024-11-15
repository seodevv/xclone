import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsYourLocation from '@/app/(afterLogin)/settings/your_twitter_data/location/_component/SettingsYourLocation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'See places you’ve been / XClone',
};

export default function SettingsYourLocationPage() {
  const header = 'See places you’ve been';
  const inform =
    'These are the places X uses to show you more relevant content. You won’t see places listed here if you turned off “Personalize based on places you’ve been”.';
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsInform inform={inform} />
      <SettingsYourLocation />
    </SettingsSubWrapper>
  );
}
