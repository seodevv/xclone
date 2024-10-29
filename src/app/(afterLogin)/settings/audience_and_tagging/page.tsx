import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingSubWrapper from '@/app/(afterLogin)/settings/_component/SettingSubWrapper';
import SettingsAudience from '@/app/(afterLogin)/settings/audience_and_tagging/_component/SettingsAudience';

export default function SettingsAudiencePage() {
  const header = 'Audience, media and tagging';
  const inform = 'Manage what information you allow other people on X to see.';
  return (
    <SettingSubWrapper header={header} noBack={false}>
      <SettingsInform inform={inform} />
      <SettingsAudience />
    </SettingSubWrapper>
  );
}
