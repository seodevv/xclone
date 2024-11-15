'use client';

import utils from '@/app/utility.module.css';
import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import Link from 'next/link';
import SettingsSubMenu from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import useSettingsLocalStore, {
  NotificationsSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';

export default function SettingsNotificationsFilters() {
  const { notifications, setNotifications } = useSettingsLocalStore(
    NotificationsSelector
  );

  return (
    <div>
      <IdentifierCheckBox
        title={'Quality filter'}
        sub={
          <>
            Choose to filter out content such as duplicate or automated posts.
            This doesn’t apply to notifications from accounts you follow or have
            interacted with recently.&nbsp;
            <Link
              className={utils.link}
              href={
                'https://help.x.com/managing-your-account/understanding-the-notifications-timeline'
              }
              target="_blank"
            >
              Learn more
            </Link>
          </>
        }
        noMargin
        noPad={false}
        defaultValue={notifications.qualityFilter}
        onChange={(value) => setNotifications({ qualityFilter: value })}
      />
      <SettingsSubMenu
        type="link"
        href="/settings/notifications/advanced_filters"
        title="Muted notifications"
      />
    </div>
  );
}
