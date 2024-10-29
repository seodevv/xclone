import styles from './settings.menu.module.css';
import SettingsMenu from '@/app/(afterLogin)/settings/_component/SettingsMenu';

export default function SettingsMenus() {
  const menus = [
    { text: 'Your account', path: '/settings/account' },
    { text: 'Monetization', path: '/settings/monetization' },
    { text: 'Premium', path: '/i/premium_sign_up' },
    { text: 'Creator Subscriptions', path: '/settings/manage_subscriptions' },
    {
      text: 'Security and account access',
      path: '/settings/security_and_account_access',
    },
    { text: 'Privacy and safety', path: '/settings/privacy_and_safety' },
    { text: 'Notifications', path: '/settings/notifications' },
    {
      text: 'Accessibility, display, and languages',
      path: '/settings/accessibility_display_and_languages',
    },
    { text: 'Additional resources', path: '/settings/about' },
    { text: 'Help Center', path: 'https://help.x.com/ko', external: true },
  ];

  return (
    <div className={styles.list}>
      {menus.map((v) => (
        <SettingsMenu
          key={v.text}
          text={v.text}
          path={v.path}
          external={v.external}
        />
      ))}
    </div>
  );
}
