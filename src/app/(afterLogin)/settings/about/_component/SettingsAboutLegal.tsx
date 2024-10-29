import PageHeader from '@/app/(afterLogin)/_component/_page/PageHeader';
import SettingsMenu from '@/app/(afterLogin)/settings/_component/SettingsMenu';
import DivideLine from '@/app/_component/_util/DivideLine';

export default function SettingsAboutLegal() {
  const title = 'Legal';
  const subMenus = [
    {
      id: 0,
      path: 'https://business.x.com/en/help/troubleshooting/how-x-ads-work',
      text: 'Ads info',
      external: true,
    },
    {
      id: 1,
      path: 'https://help.x.com/ko/rules-and-policies/x-cookies',
      text: 'Cookie Policy',
      external: true,
    },
    {
      id: 2,
      path: 'https://x.com/ko/privacy',
      text: 'Privacy Policy',
      external: true,
    },
    {
      id: 3,
      path: 'https://x.com/ko/tos',
      text: 'Terms of Service',
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
