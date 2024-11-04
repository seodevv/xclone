import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import AccountAutomation from '@/app/(afterLogin)/settings/account/automation/_component/AccountAutomation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Automation / XClone',
};

export default function SettingsAccountAutomationPage() {
  const header = 'Automation';
  const inform = 'Manage your automated account.';
  return (
    <SettingsSubWrapper
      header={header}
      noBack={false}
      prevPath="/settings/account"
    >
      <SettingsInform inform={inform} />
      <AccountAutomation />
    </SettingsSubWrapper>
  );
}
