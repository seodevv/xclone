import PageHeader from '@/app/(afterLogin)/_component/_page/PageHeader';
import SettingsSubMenu, {
  ISettingsSubMenu,
} from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import AdsSvg from '@/app/_svg/_settings/AdsSvg';
import ConnectedSvg from '@/app/_svg/_settings/ConnectedSvg';
import GrokSvg from '@/app/_svg/_settings/GrokSvg';
import InferedSvg from '@/app/_svg/_settings/InferedSvg';
import LocationSvg from '@/app/_svg/tweet/LocationSvg';

export default function SettingsPrivacyPersonalization() {
  const title = 'Data sharing and personalization';
  const subMenus: ISettingsSubMenu[] = [
    {
      id: 0,
      type: 'link',
      href: '/settings/',
      svg: <AdsSvg />,
      title: 'Ads preferences',
      sub: 'Manage your ads experience on X.',
    },
    {
      id: 1,
      type: 'link',
      href: '/settings/off_twitter_activity',
      svg: <InferedSvg />,
      title: 'Inferred identity',
      sub: 'Allow X to personalize your experience with your inferred activity, e.g. activity on devices you haven’t used to log in to X.',
    },
    {
      id: 2,
      type: 'link',
      href: '/settings/data_sharing_with_business_partners',
      svg: <ConnectedSvg />,
      title: 'Data sharing with business partners',
      sub: 'Allow sharing of additional information with X’s business partners.',
    },
    {
      id: 3,
      type: 'link',
      href: '/settings/location_information',
      svg: <LocationSvg />,
      title: 'Location information',
      sub: 'Manage the location information X uses to personalize your experience.',
    },
    {
      id: 4,
      type: 'link',
      href: '/settings/grok_settings',
      svg: <GrokSvg />,
      title: 'Grok',
      sub: 'Allow your posts as well as your interactions, inputs, and results with Grok to be used for training and fine-tuning.',
    },
  ];

  return (
    <>
      <PageHeader title={title} height={48} noBack />
      {subMenus.map((m) => (
        <SettingsSubMenu
          key={m.id}
          type={m.type}
          href={m.href}
          svg={m.svg}
          title={m.title}
          sub={m.sub}
          external={m.external}
          onClick={m.onClick}
        />
      ))}
    </>
  );
}
