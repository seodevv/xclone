import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import IdVerification from '@/app/(afterLogin)/settings/account/id_verification/_component/IdVericiation';

export default function SettingsIdVerificationPage() {
  const header = 'ID verification';
  const inform =
    'ID verification can help protect your account against impersonation and grants your profile an ID verified label.';
  return (
    <SettingsSubWrapper header={header} noBack={false}>
      <SettingsInform inform={inform} />
      <IdVerification />
    </SettingsSubWrapper>
  );
}
