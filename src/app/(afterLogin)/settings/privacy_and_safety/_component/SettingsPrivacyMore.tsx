import PageHeader from '@/app/(afterLogin)/_component/_page/PageHeader';
import SettingsMenu from '@/app/(afterLogin)/settings/_component/SettingsMenu';

export default function SettingsPrivacyMore() {
  const title = 'Learn more about privacy on X';
  const menus = [
    {
      id: 0,
      text: 'Privacy center',
      path: 'https://privacy.x.com',
      external: true,
    },
    {
      id: 1,
      text: 'Privacy policy',
      path: 'https://x.com/en/privacy',
      external: true,
    },
    {
      id: 2,
      text: 'Contact us',
      path: 'https://help.x.com/forms/privacy',
      external: true,
    },
  ];

  return (
    <>
      <PageHeader title={title} height={48} noBack />
      {menus.map((m) => (
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
