import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubMenu, {
  ISettingsSubMenu,
} from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apps and sessions / XClone',
};

export default function SettingsAppSessionsPage() {
  const header = 'Apps and sessions';
  const inform =
    'See information about when you logged into your account and the apps you connected to your account.';
  const subMenus: ISettingsSubMenu[] = [
    {
      id: 0,
      type: 'link',
      href: '/settings/connected_apps',
      title: 'Connected apps',
    },
    {
      id: 1,
      type: 'link',
      href: '/settings/sessions',
      title: 'Sessions',
    },
    {
      id: 2,
      type: 'link',
      href: '/settings/your_twitter_data/login_history',
      title: 'Account access history',
    },
    {
      id: 3,
      type: 'link',
      href: '/settings/your_twitter_data/devices',
      title: 'Logged-in devices and apps',
    },
  ];

  return (
    <SettingsSubWrapper header={header} noBack={false}>
      <SettingsInform inform={inform} />
      {subMenus.map((v) => (
        <SettingsSubMenu
          key={v.id}
          type={v.type}
          href={v.href}
          title={v.title}
        />
      ))}
    </SettingsSubWrapper>
  );
}
