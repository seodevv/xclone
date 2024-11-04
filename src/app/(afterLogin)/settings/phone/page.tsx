import FlexLink from '@/app/(afterLogin)/_component/Link/FlexLink';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Change phone / XClone',
};

export default function SettingsPhonePage() {
  const header = 'Change phone';
  return (
    <SettingsSubWrapper header={header} noBack={false}>
      <FlexLink href="/i/flow/add_phone" content="Add phone number" />
    </SettingsSubWrapper>
  );
}
