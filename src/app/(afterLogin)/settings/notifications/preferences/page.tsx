import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubMenu, {
  ISettingsSubMenu,
} from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import utils from '@/app/utility.module.css';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Preferences / XClone',
};

export default function SettingsNotificationsPreferencesPage() {
  const header = 'Preferences';
  const inform = (
    <>
      Select your preferences by notification type.&nbsp;
      <Link
        className={utils.link}
        href={
          'https://help.x.com/managing-your-account/notifications-on-mobile-devices'
        }
        target="_blank"
      >
        Learn more
      </Link>
    </>
  );
  const prevPath = '/settings/account';
  const subMenus: ISettingsSubMenu[] = [
    {
      id: 0,
      type: 'link',
      href: '/settings/push_notifications',
      title: 'Push notifications',
    },
    {
      id: 1,
      type: 'link',
      href: '/settings/email_notifications',
      title: 'Email notifications',
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
