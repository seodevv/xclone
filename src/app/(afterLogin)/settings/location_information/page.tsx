import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsLocationInformation from '@/app/(afterLogin)/settings/location_information/_component/SettingsLocationInformation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Location information / XClone',
};

export default function SettingsLocationInformationPage() {
  const header = 'Location information';
  const inform =
    'Manage the location information X uses to personalize your experience.';
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsInform inform={inform} />
      <SettingsLocationInformation />
    </SettingsSubWrapper>
  );
}
