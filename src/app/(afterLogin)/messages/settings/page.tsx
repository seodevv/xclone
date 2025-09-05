import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsDirectMessages from '@/app/(afterLogin)/settings/direct_messages/_component/SettingsDirectMessages';

export default function MessagesSettingsPage() {
  const header = 'Direct Messages';
  const prevPath = '/messages';

  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsDirectMessages />
    </SettingsSubWrapper>
  );
}
