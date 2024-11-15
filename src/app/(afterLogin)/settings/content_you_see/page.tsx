import MyProfileHydrationBoundary from '@/app/(afterLogin)/_boundary/MyProfileHydrationBoundary';
import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsContentYouSee from '@/app/(afterLogin)/settings/content_you_see/_component/SettingsContentYouSee';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content you see / XClone',
};

export default function SettingsContentYouSeePage() {
  const header = 'Content you see';
  const inform =
    'Decide what you see on X based on your preferences like Topics and interests';
  const prevPath = '/settings/privacy_and_safety';
  return (
    <MyProfileHydrationBoundary>
      <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
        <SettingsInform inform={inform} />
        <SettingsContentYouSee />
      </SettingsSubWrapper>
    </MyProfileHydrationBoundary>
  );
}
