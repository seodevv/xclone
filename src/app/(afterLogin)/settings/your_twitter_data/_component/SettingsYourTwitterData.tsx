import SettingsSubMenu, {
  ISettingsSubMenu,
} from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';

export default function SettingsYourTwitterData() {
  const subMenus: ISettingsSubMenu[] = [
    {
      id: 0,
      type: 'link',
      href: '/settings/your_twitter_data/account',
      title: 'Account',
    },
    {
      id: 1,
      type: 'link',
      href: '/settings/your_twitter_data/account_history',
      title: 'Account history',
    },
    {
      id: 2,
      type: 'link',
      href: '/settings/your_twitter_data/devices',
      title: 'Apps, devices & information',
    },
    {
      id: 3,
      type: 'link',
      href: '/settings/your_twitter_data/account_activity',
      title: 'Account activity',
    },
    {
      id: 4,
      type: 'link',
      href: '/settings/your_twitter_data/ads',
      title: 'Interests and ads data',
    },
    {
      id: 5,
      type: 'link',
      href: '/settings/download_your_data',
      title: 'Download archive',
    },
  ];

  return (
    <div>
      {subMenus.map((v) => (
        <SettingsSubMenu
          key={v.id}
          type={v.type}
          href={v.href}
          title={v.title}
        />
      ))}
    </div>
  );
}
