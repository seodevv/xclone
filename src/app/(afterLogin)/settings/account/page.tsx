import ProfileSvg from '@/app/_svg/navbar/ProfileSvg';
import SettingsSubMenu, {
  ISettingsSubMenu,
} from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import KeySvg from '@/app/_svg/_settings/KeySvg';
import DownloadSvg from '@/app/_svg/_settings/DownloadSvg';
import DeactivateSvg from '@/app/_svg/_settings/DeactivateSvg';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Account / X',
};

export default function SettingsAccountPage() {
  const header = 'Your Account';
  const inform =
    'See information about your account, download an archive of your data, or learn about your account deactivation options';

  const subMenus: ISettingsSubMenu[] = [
    {
      id: 0,
      type: 'link',
      href: '/settings/your_twitter_data/account',
      svg: <ProfileSvg />,
      title: 'Account information',
      sub: 'See your account information like your phone number and email address.',
    },
    {
      id: 1,
      type: 'link',
      href: '/settings/password',
      svg: <KeySvg />,
      title: 'Change your password',
      sub: 'Change your password at any time.',
    },
    {
      id: 2,
      type: 'link',
      href: '/settings/download_your_data',
      svg: <DownloadSvg />,
      title: 'Download an archive of your data',
      sub: 'Get insights into the type of information stored for your account.',
    },
    {
      id: 3,
      type: 'link',
      href: '/settings/deactivate',
      svg: <DeactivateSvg />,
      title: 'Deactivate your account',
      sub: 'Find out how you can deactivate your account.',
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
        />
      ))}
    </SettingsSubWrapper>
  );
}
