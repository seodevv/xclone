import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsAudience from '@/app/(afterLogin)/settings/audience_and_tagging/_component/SettingsAudience';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Audience, media and tagging / XClone',
};

export default function SettingsAudiencePage() {
  const header = 'Audience, media and tagging';
  const inform = 'Manage what information you allow other people on X to see.';
  return (
    <SettingsSubWrapper header={header} noBack={false}>
      <SettingsInform inform={inform} />
      <SettingsAudience />
    </SettingsSubWrapper>
  );
}
