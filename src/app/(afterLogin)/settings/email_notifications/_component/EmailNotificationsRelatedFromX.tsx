'use client';

import DivideLine from '@/app/_component/_util/DivideLine';
import IdentifierCheckBox, {
  ICheckBox,
} from '@/app/_component/_input/IdentifierCheckBox';
import Text from '@/app/_component/_text/Text';
import useSettingsLocalStore, {
  EmailNotificationSelector,
  SettingsLocalStore,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';

interface Props {
  disable?: boolean;
}

export default function EmailNotificationsRelatedFromX({ disable }: Props) {
  const title = 'From X';
  const { email, setEmail } = useSettingsLocalStore(EmailNotificationSelector);
  const checkboxes: (Omit<ICheckBox, 'id'> & {
    id: keyof SettingsLocalStore['notifications']['email']['fromX'];
  })[] = [
    {
      id: 'newsUpdates',
      title: 'News about X product and feature updates',
      defaultValue: email.fromX.newsUpdates,
    },
    {
      id: 'tipsX',
      title: 'Tips on getting more out of X',
      defaultValue: email.fromX.tipsX,
    },
    {
      id: 'lastLogged',
      title: 'Things you missed since you last logged into X',
      defaultValue: email.fromX.lastLogged,
    },
    {
      id: 'newsXPartner',
      title: 'News about X on partner products and other third party services',
      defaultValue: email.fromX.newsXPartner,
    },
    {
      id: 'participation',
      title: 'Participation in X reserach surveys',
      defaultValue: email.fromX.participation,
    },
    {
      id: 'suggestionsAccounts',
      title: 'Suggestions for recommended accounts',
      defaultValue: email.fromX.suggestionsAccounts,
    },
    {
      id: 'suggestionsFollows',
      title: 'Suggestions based on your recent follows',
      defaultValue: email.fromX.suggestionsFollows,
    },
    {
      id: 'tipsXBusiness',
      title: 'Tips on X business products',
      defaultValue: email.fromX.tipsXBusiness,
    },
  ];

  return (
    <div>
      <DivideLine />
      <Text size="xl" bold="bold" pad>
        {title}
      </Text>
      {checkboxes.map((v) => (
        <IdentifierCheckBox
          key={v.id}
          title={v.title}
          noMargin
          noPad={false}
          disable={disable}
          defaultValue={v.defaultValue}
          onChange={(value) => setEmail({ fromX: { [v.id]: value } })}
        />
      ))}
    </div>
  );
}
