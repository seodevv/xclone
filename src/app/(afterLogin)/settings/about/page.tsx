import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingSubWrapper from '@/app/(afterLogin)/settings/_component/SettingSubWrapper';
import SettingsAboutLegal from '@/app/(afterLogin)/settings/about/_component/SettingsAboutLegal';
import SettingsAboutMiscellaneous from '@/app/(afterLogin)/settings/about/_component/SettingsAboutMiscellaneous';
import SettingsAboutReleaseNotes from '@/app/(afterLogin)/settings/about/_component/SettingsAboutReleaseNotes';

export default function SettingsAboutPage() {
  const header = 'Additional resources';
  const inform =
    'Check out other places for helpful information to learn more about X products and services.';
  return (
    <SettingSubWrapper header={header}>
      <SettingsInform inform={inform} />
      <SettingsAboutReleaseNotes />
      <SettingsAboutLegal />
      <SettingsAboutMiscellaneous />
    </SettingSubWrapper>
  );
}
