import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubMenu, {
  ISettingsSubMenu,
} from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import FiltersSvg from '@/app/_svg/_settings/FiltersSvg';
import PreferencesSvg from '@/app/_svg/_settings/PreferencesSvg';

export default function SettingsNotificationsPage() {
  const header = 'Notifications';
  const inform =
    'Select the kinds of notifications you get about your activities, interests, and recommendations.';
  const subMenus: ISettingsSubMenu[] = [
    {
      id: 0,
      type: 'link',
      href: '/settings/notifications/filters',
      svg: <FiltersSvg />,
      title: 'Filters',
      sub: "Choose the notifications you'd like to see -- and those you don't.",
    },
    {
      id: 1,
      type: 'link',
      href: '/settings/notifications/preferences',
      svg: <PreferencesSvg />,
      title: 'Preferences',
      sub: 'Select your preferences by notification type.',
    },
  ];
  return (
    <SettingsSubWrapper header={header}>
      <SettingsInform inform={inform} />
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
    </SettingsSubWrapper>
  );
}
