import FlexLink from '@/app/(afterLogin)/_component/Link/FlexLink';
import SettingSubWrapper from '@/app/(afterLogin)/settings/_component/SettingSubWrapper';

export default function SettingsPhonePage() {
  const header = 'Change phone';
  return (
    <SettingSubWrapper header={header} noBack={false}>
      <FlexLink href="/i/flow/add_phone" content="Add phone number" />
    </SettingSubWrapper>
  );
}
