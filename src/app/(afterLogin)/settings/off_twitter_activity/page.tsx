import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import OffTwitter from '@/app/(afterLogin)/settings/off_twitter_activity/_component/OffTwitter';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inferred identity / XClone',
};

export default function SettingsOffTwitterPage() {
  const header = 'Inferred identity';
  const inform =
    'Allow X to personalize your experience with your inferred activity, e.g. activity on devices you haven’t used to log in to X.';
  return (
    <SettingsSubWrapper header={header} noBack={false}>
      <SettingsInform inform={inform} />
      <OffTwitter />
    </SettingsSubWrapper>
  );
}
