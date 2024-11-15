'use client';

import useSettingsLocalStore, {
  PushNotificationsSelector,
  SettingsLocalStore,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import IdentifierCheckBox, {
  ICheckBox,
} from '@/app/_component/_input/IdentifierCheckBox';
import Text from '@/app/_component/_text/Text';
import DivideLine from '@/app/_component/_util/DivideLine';

export default function PushNotificationsOptionsFromX() {
  const { push, setPushNotifications } = useSettingsLocalStore(
    PushNotificationsSelector
  );
  const title = 'From X';
  const checkboxes: (Omit<ICheckBox, 'id'> & {
    id: keyof SettingsLocalStore['notifications']['push']['fromX'];
  })[] = [
    { id: 'topics', title: 'Topcis', defaultValue: push.fromX.topics },
    {
      id: 'newsSports',
      title: 'News / Sports',
      defaultValue: push.fromX.newsSports,
    },
    {
      id: 'recommendations',
      title: 'Recommendations',
      defaultValue: push.fromX.recommendations,
    },
    { id: 'moments', title: 'Moments', defaultValue: push.fromX.moments },
    {
      id: 'broadcastsSpaces',
      title: 'Broadcasts & Spaces',
      defaultValue: push.fromX.broadcastsSpaces,
    },
    {
      id: 'otherLiveBroadcasts',
      title: 'Other live broadcasts',
      defaultValue: push.fromX.otherLiveBroadcasts,
    },
    {
      id: 'crisisEmbergencyAlerts',
      title: 'Crisis and emergency alerts',
      defaultValue: push.fromX.crisisEmbergencyAlerts,
    },
  ];

  return (
    <>
      <DivideLine />
      <Text size="xl" bold="bold" pad>
        {title}
      </Text>
      {checkboxes.map((v) => (
        <IdentifierCheckBox
          key={v.id}
          title={v.title}
          defaultValue={v.defaultValue}
          noMargin
          noPad={false}
          onChange={(value) => {
            setPushNotifications({ fromX: { [v.id]: value } });
          }}
        />
      ))}
    </>
  );
}
