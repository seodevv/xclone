import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubMenu, {
  ISettingsSubMenu,
} from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mute and block / XClone',
};

export default function SettingsMuteAndBlockPage() {
  const header = 'Mute and block';
  const inform =
    'Manage the accounts, words, and notifications that you’ve muted or blocked.';
  const prevPath = '/settings/account';
  const subMenus: ISettingsSubMenu[] = [
    {
      id: 0,
      type: 'link',
      href: '/settings/blocked/all',
      title: 'Blocked accounts',
    },
    {
      id: 1,
      type: 'link',
      href: '/settings/muted/all',
      title: 'Muted accounts',
    },
    {
      id: 2,
      type: 'link',
      href: '/settings/muted_keywords',
      title: 'Muted words',
    },
    {
      id: 3,
      type: 'link',
      href: '/settings/notifications/advanced_filters',
      title: 'Muted notifications',
    },
  ];
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
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
