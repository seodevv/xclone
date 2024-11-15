import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsYourTweets from '@/app/(afterLogin)/settings/your_tweets/_component/SettingsYourTweets';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your posts / XClone',
};

export default function SettingsYourTweetsPage() {
  const header = 'Your posts';
  const inform = 'Manage the information associated with your posts.';
  const prevPath = '/settings/privacy_and_safety';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsInform inform={inform} />
      <SettingsYourTweets />
    </SettingsSubWrapper>
  );
}
