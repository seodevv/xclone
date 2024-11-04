import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubMenu, {
  ISettingsSubMenu,
} from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import ConnectedSvg from '@/app/_svg/_settings/ConnectedSvg';
import DelegateSvg from '@/app/_svg/_settings/DelegateSvg';
import SessionsSvg from '@/app/_svg/_settings/SessionsSvg';
import LockSvg from '@/app/_svg/profile/LockSvg';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security and account access / XClone',
};

export default function SettingsSecurityPage() {
  const header = 'Security and account access';
  const inform =
    'Manage your account’s security and keep track of your account’s usage including apps that you have connected to your account.';

  const subMenus: ISettingsSubMenu[] = [
    {
      id: 0,
      type: 'link',
      href: '/settings/security',
      svg: <LockSvg />,
      title: 'Security',
      sub: "Manage your account's security.",
    },
    {
      id: 1,
      type: 'link',
      href: '/settings/app_and_sessions',
      svg: <SessionsSvg />,
      title: 'Apps and sessions',
      sub: 'See information about when you logged into your account and the apps you connected to your account.',
    },
    {
      id: 2,
      type: 'link',
      href: '/settings/connected_accounts',
      svg: <ConnectedSvg />,
      title: 'Connected accounts',
      sub: 'Manage Google or Apple accounts connected to X to log in.',
    },
    {
      id: 3,
      type: 'link',
      href: '/settings/delegate',
      svg: <DelegateSvg />,
      title: 'Delegate',
      sub: 'Manage your shared accounts.',
    },
  ];
  return (
    <SettingsSubWrapper header={header}>
      <SettingsInform inform={inform} />
      {subMenus.map((sub) => (
        <SettingsSubMenu
          key={sub.id}
          type={sub.type}
          href={sub.href}
          svg={sub.svg}
          title={sub.title}
          sub={sub.sub}
          external={sub.external}
          onClick={sub.onClick}
        />
      ))}
    </SettingsSubWrapper>
  );
}
