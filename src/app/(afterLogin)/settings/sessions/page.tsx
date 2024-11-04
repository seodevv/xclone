import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import ActiveSession from '@/app/(afterLogin)/settings/sessions/_component/ActiveSession';
import OtherSession from '@/app/(afterLogin)/settings/sessions/_component/OtherSession';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sessions / XClone',
};

export default function SettingsSessionsPage() {
  const header = 'Sessions';
  const inform =
    'Sessions are the devices you are using or that have used your X account. These are the sessions where your account is currently logged in. You can log out of each session.';
  return (
    <SettingsSubWrapper header={header} noBack={false}>
      <SettingsInform inform={inform} />
      <ActiveSession />
      <OtherSession />
    </SettingsSubWrapper>
  );
}
