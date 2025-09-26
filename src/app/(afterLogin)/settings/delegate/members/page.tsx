import utils from '@/app/utility.module.css';
import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import { Metadata } from 'next';
import Link from 'next/link';
import DelegateMembers from '@/app/(afterLogin)/settings/delegate/members/_components/DelegateMembers';

export const metadata: Metadata = {
  title: `Members you've delegated / XClone`,
};

export default function SettingsDelegateMembersPage() {
  const header = `Members you've delegated`;
  const inform = (
    <>
      Invite others to act on behalf of your account and manage account roles.
      Members can send Direct Messages, publish posts, and create Lists - as
      well as view them.&nbsp;
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

  return (
    <SettingsSubWrapper header={header} noBack={false}>
      <SettingsInform inform={inform} />
      <DelegateMembers />
    </SettingsSubWrapper>
  );
}
