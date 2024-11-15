import SettingsSubMenu, {
  ISettingsSubMenu,
} from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interests and ads data / XClone',
};

export default function SettingsYourAdsPage() {
  const header = 'Interests and ads data';
  const prevPath = '/settings/account';
  const subMenus: ISettingsSubMenu[] = [
    {
      id: 0,
      type: 'link',
      href: '/settings/your_twitter_data/twitter_interests',
      title: 'Interests from X',
    },
    {
      id: 1,
      type: 'link',
      href: '/settings/your_twitter_data/partner_interests',
      title: 'Inferred interests from partners',
    },
    {
      id: 2,
      type: 'link',
      href: '/settings/your_twitter_data/audiences',
      title: 'Tallored audiences',
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
