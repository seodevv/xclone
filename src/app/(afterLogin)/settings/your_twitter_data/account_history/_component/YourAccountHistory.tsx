'use client';

import useSettingsLocalStore from '@/app/(afterLogin)/_store/SettingsLocalStore';
import SettingsSubMenu, {
  ISettingsSubMenu,
} from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';

export default function YourAccountHistory() {
  const history = useSettingsLocalStore((state) => state.location.history);
  const subMenus: ISettingsSubMenu[] = [
    {
      id: 0,
      type: 'link',
      href: '/settings/your_twitter_data/login_history',
      title: 'Account access history',
    },
    {
      id: 1,
      type: 'link',
      href: '/settings/your_twitter_data/locations',
      title: 'Places you’ve been',
      sub: `${history.length} location`,
    },
  ];
  return subMenus.map((v) => (
    <SettingsSubMenu
      key={v.id}
      type={v.type}
      href={v.href}
      title={v.title}
      sub={v.sub}
    />
  ));
}
