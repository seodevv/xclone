'use client';

import useSettingsLocalStore, {
  PushNotificationsSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import Text from '@/app/_component/_text/Text';
import DivideLine from '@/app/_component/_util/DivideLine';

export default function PushNotificationsOptionsXProfessionals() {
  const { push, setPushNotifications } = useSettingsLocalStore(
    PushNotificationsSelector
  );
  const title = 'X for Professionals';

  return (
    <>
      <DivideLine />
      <Text size="xl" bold="bold" pad>
        {title}
      </Text>
      <IdentifierCheckBox
        title={'Ads campaigns'}
        noMargin
        noPad={false}
        defaultValue={push.xProfessionals.adsCampaigns}
        onChange={(value) =>
          setPushNotifications({ xProfessionals: { adsCampaigns: value } })
        }
      />
    </>
  );
}
