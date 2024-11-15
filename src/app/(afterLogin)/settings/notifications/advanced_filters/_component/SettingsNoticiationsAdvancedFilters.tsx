'use client';

import useSettingsLocalStore, {
  MutedNotificationsSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import IdentifierCheckBox, {
  ICheckBox,
} from '@/app/_component/_input/IdentifierCheckBox';
import Text from '@/app/_component/_text/Text';
import utils from '@/app/utility.module.css';
import Link from 'next/link';

export default function SettingsNotificationsAdvancedFilters() {
  const { mutedNotifications, setMutedNotifications } = useSettingsLocalStore(
    MutedNotificationsSelector
  );
  const checkboxes: ICheckBox[] = [
    {
      id: 0,
      title: 'You don’t follow',
      defaultValue: mutedNotifications.follow,
    },
    {
      id: 1,
      title: 'Who don’t follow you',
      defaultValue: mutedNotifications.following,
    },
    {
      id: 2,
      title: 'With a new account',
      defaultValue: mutedNotifications.newAccount,
    },
    {
      id: 3,
      title: 'Who have a default profile photo',
      defaultValue: mutedNotifications.defaultProfile,
    },
    {
      id: 4,
      title: 'Who haven’t confirmed their email',
      defaultValue: mutedNotifications.confirmedEmail,
    },
    {
      id: 5,
      title: 'Who haven’t confirmed their phone number',
      defaultValue: mutedNotifications.confirmedPhone,
    },
  ];

  return (
    <div>
      <Text className={utils.p_basic} size="xl" bold="bold">
        Mute notifications from people:
      </Text>
      {checkboxes.map((v) => (
        <div key={v.id} className={utils.pa_16}>
          <IdentifierCheckBox
            title={v.title}
            defaultValue={v.defaultValue}
            noMargin
            onChange={(value) => {
              switch (v.id) {
                case 0:
                  setMutedNotifications({
                    follow: value,
                  });
                  break;
                case 1:
                  setMutedNotifications({
                    following: value,
                  });
                  break;
                case 2:
                  setMutedNotifications({
                    newAccount: value,
                  });
                  break;
                case 3:
                  setMutedNotifications({
                    defaultProfile: value,
                  });
                  break;
                case 4:
                  setMutedNotifications({
                    confirmedEmail: value,
                  });
                  break;
                case 5:
                  setMutedNotifications({
                    confirmedPhone: value,
                  });
                  break;
              }
            }}
          />
        </div>
      ))}
      <Text className={utils.p_basic} size="xs" theme="gray">
        These filters won’t affect notifications from people you follow.&nbsp;
        <Link
          className={utils.link}
          href={
            'https://help.x.com/managing-your-account/understanding-the-notifications-timeline'
          }
          target="_blank"
        >
          Learn more
        </Link>
      </Text>
    </div>
  );
}
