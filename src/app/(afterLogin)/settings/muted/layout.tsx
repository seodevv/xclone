import utils from '@/app/utility.module.css';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import Link from 'next/link';
import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';

interface Props {
  children: React.ReactNode;
}

export default function SettingsMutedLayout({ children }: Props) {
  const header = 'Muted accounts';
  const inform = (
    <>
      Here’s everyone you muted. You can add or remove them from this
      list.&nbsp;
      <Link
        className={utils.link}
        href={'https://help.x.com/using-x/x-mute'}
        target="_blank"
      >
        Learn more
      </Link>
    </>
  );
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsInform inform={inform} divideLine />
      {children}
    </SettingsSubWrapper>
  );
}
