import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsAdsPreferences from '@/app/(afterLogin)/settings/ads_preferences/_component/SettingsAdsPreferences';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ads preferences / XClone',
};

export default function SettingsAdsPreferencesPage() {
  const header = 'Ads preferences';
  const inform = 'Manage your ads experience on X.';
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsInform inform={inform} />
      <SettingsAdsPreferences />
    </SettingsSubWrapper>
  );
}
