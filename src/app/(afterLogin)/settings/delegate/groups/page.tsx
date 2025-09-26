import utils from '@/app/utility.module.css';
import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import Link from 'next/link';
import Text from '@/app/_component/_text/Text';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account delegated to you / XClone',
};

export default function SettingsDelegateGroupsPage() {
  const header = 'Accounts delegated to you';
  const inform = (
    <>
      As a member, you can send Direct Messages, publish posts, and create Lists
      — as well as view them. Admins can also invite or remove contributors to
      the account and view post analytics.&nbsp;
      <Link
        className={utils.link}
        href={
          'https://help.x.com/ko/managing-your-account/how-to-use-the-delegate-feature'
        }
        target="_blank"
      >
        Learn more
      </Link>
    </>
  );
  const content = 'You haven’t been delegated to any accounts';
  return (
    <SettingsSubWrapper header={header} noBack={false}>
      <SettingsInform inform={inform} />
      <Text size="m" bold="bold" align="center">
        {content}
      </Text>
    </SettingsSubWrapper>
  );
}
