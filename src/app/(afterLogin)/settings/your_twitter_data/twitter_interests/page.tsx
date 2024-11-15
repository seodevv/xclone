import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsYourInterests from '@/app/(afterLogin)/settings/your_twitter_data/twitter_interests/_component/SettingsYourInterests';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interests / XClone',
};

export default function SettingsYourInterestsPage() {
  const header = 'Interests';
  const inform =
    'These are some of the interests matched to you based on your profile, activity, and the Topics you follow. These are used to personalize your experience across X, including the ads you see. You can adjust your interests if something doesn’t look right. Any changes you make may take a little while to go into effect.';
  const prevPath = '/settings/privacy_and_safety';
  return (
    <SettingsSubWrapper header={header} prevPath={prevPath} noBack={false}>
      <SettingsInform inform={inform} />
      <SettingsYourInterests />
    </SettingsSubWrapper>
  );
}
