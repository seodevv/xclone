import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubMenu, {
  ISettingsSubMenu,
} from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import AccessibilitySvg from '@/app/_svg/_settings/AccessibilitySvg';
import ShortcutsSvg from '@/app/_svg/_settings/ShortcutsSvg';
import ViewSvg from '@/app/_svg/actionbuttons/ViewSvg';
import GlobalSvg from '@/app/_svg/post/GlobalSvg';
import EditSvg from '@/app/_svg/tweet/EditSvg';

export default function SettingsAccessibilityPage() {
  const header = 'Accessibility, display and languages';
  const inform = 'Manage how X content is displayed to you.';
  const subMenus: ISettingsSubMenu[] = [
    {
      id: 0,
      type: 'link',
      href: '/settings/accessibility',
      svg: <AccessibilitySvg />,
      title: 'Accessibility',
      sub: 'Manage aspects of your X experience such as limiting color contrast and motion.',
    },
    {
      id: 1,
      type: 'link',
      href: '/settings/display',
      svg: <EditSvg />,
      title: 'Display',
      sub: 'Manage your font size, color, and background. These settings affect all the X accounts on this browser.',
    },
    {
      id: 2,
      type: 'link',
      href: '/settings/languages',
      svg: <GlobalSvg />,
      title: 'Languages',
      sub: 'Manage which languages are used to personalize your X experience.',
    },
    {
      id: 3,
      type: 'link',
      href: '/settings/data',
      svg: <ViewSvg />,
      title: 'Data usage',
      sub: 'Limit how X uses some of your network data on this device.',
    },
    {
      id: 4,
      type: 'link',
      href: '/i/keyboard_shortcuts',
      svg: <ShortcutsSvg />,
      title: 'Keyboard shortcuts',
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
