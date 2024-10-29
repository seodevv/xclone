import PageHeader from '@/app/(afterLogin)/_component/_page/PageHeader';
import SettingsMenu from '@/app/(afterLogin)/settings/_component/SettingsMenu';
import DivideLine from '@/app/_component/_util/DivideLine';

export default function SettingsAboutMiscellaneous() {
  const title = 'Miscellaneous';
  const subMenus = [
    {
      id: 0,
      path: 'https://about.x.com',
      text: 'About',
      external: true,
    },
    {
      id: 1,
      path: 'https://help.x.com/ko/resources/accessibility',
      text: 'Accessibility',
      external: true,
    },
    {
      id: 2,
      path: 'https://ads.x.com/onboarding/18ce55qg3aj/welcome?ref=gl-tw-tw-twitter-advertise',
      text: 'Advertising',
      external: true,
    },
    {
      id: 3,
      path: 'https://blog.x.com/',
      text: 'Blog',
      external: true,
    },
    {
      id: 4,
      path: 'https://about.x.com/en/who-we-are/brand-toolkit',
      text: 'Brand Resources',
      external: true,
    },
    {
      id: 5,
      path: 'https://careers.x.com/en',
      text: 'Careers',
      external: true,
    },
    {
      id: 6,
      path: 'https://developer.x.com',
      text: 'Developers',
      external: true,
    },
    {
      id: 7,
      path: '/i/directory/profiles',
      text: 'Directory',
      external: true,
    },
    {
      id: 8,
      path: 'https://help.x.com/en/using-x/download-the-x-app',
      text: 'Download the X app',
      external: true,
    },
    {
      id: 9,
      path: 'https://help.x.com',
      text: 'Help Center',
      external: true,
    },
    {
      id: 10,
      path: 'https://marketing.x.com',
      text: 'Marketing',
      external: true,
    },
    {
      id: 11,
      path: 'https://business.x.com/ko?ref=web-twc-ao-gbl-twitterforbusiness&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=twitterforbusiness',
      text: 'X for Business',
      external: true,
    },
  ];

  return (
    <>
      <DivideLine />
      <PageHeader title={title} height={48} noBack />
      {subMenus.map((m) => (
        <SettingsMenu
          key={m.id}
          path={m.path}
          text={m.text}
          external={m.external}
        />
      ))}
    </>
  );
}
