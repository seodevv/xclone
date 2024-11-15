import SettingsSubMenu, {
  ISettingsSubMenu,
} from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account activity / XClone',
};

export default function SettingsYourAccountActivityPage() {
  const header = 'Account activity';
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
  ];
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
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
