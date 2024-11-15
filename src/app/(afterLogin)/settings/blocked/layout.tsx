import utils from '@/app/utility.module.css';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsBlockedTabs from '@/app/(afterLogin)/settings/blocked/_component/SettingsBlockedTabs';
import Link from 'next/link';
import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';

interface Props {
  children: React.ReactNode;
}

export default function SettingsBlockedLayout({ children }: Props) {
  const header = 'Blocked accounts';
  const inform = (
    <>
      When you block someone, that person won’t be able to follow or message
      you, and you won’t see notifications from them.&nbsp;
      <Link
        className={utils.link}
        href={'https://help.x.com/using-x/blocking-and-unblocking-accounts'}
        target="_blank"
      >
        Learn more
      </Link>
    </>
  );
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsBlockedTabs />
      <SettingsInform inform={inform} divideLine />
      {children}
    </SettingsSubWrapper>
  );
}
