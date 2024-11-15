'use client';

import utils from '@/app/utility.module.css';
import IdentifierToggle from '@/app/_component/_input/IdentifierToggle';
import Link from 'next/link';
import EmailNotificationsRelatedPosts from '@/app/(afterLogin)/settings/email_notifications/_component/EmailNotificationsRelatedPosts';
import useSettingsLocalStore, {
  EmailNotificationActiveSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import EmailNotificationsRelatedFromX from '@/app/(afterLogin)/settings/email_notifications/_component/EmailNotificationsRelatedFromX';

export default function EmailNotifications() {
  const { active, setActive } = useSettingsLocalStore(
    EmailNotificationActiveSelector
  );

  return (
    <div>
      <IdentifierToggle
        title={'Email notifications'}
        sub={
          <>
            Get emails to find out what’s going on when you’re not on X. You can
            turn them off anytime.&nbsp;
            <Link
              className={utils.link}
              href={
                'https://help.x.com/managing-your-account/updating-email-preferences#tweet-activity'
              }
              target="_blank"
            >
              Learn more
            </Link>
          </>
        }
        defaultValue={active}
        onChange={(value) => setActive(value)}
      />
      <EmailNotificationsRelatedPosts disable={!active} />
      <EmailNotificationsRelatedFromX disable={!active} />
    </div>
  );
}
