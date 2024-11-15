'use client';

import utils from '@/app/utility.module.css';
import DivideLine from '@/app/_component/_util/DivideLine';
import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import IdentifierRadioBox from '@/app/_component/_input/IdentifierRadioBox';
import Text from '@/app/_component/_text/Text';
import useSettingsLocalStore, {
  EmailNotificationSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';

interface Props {
  disable?: boolean;
}

export default function EmailNotificationsRelatedPosts({ disable }: Props) {
  const title = 'Related to you and your posts';
  const { email, setEmail } = useSettingsLocalStore(EmailNotificationSelector);

  return (
    <div>
      <DivideLine />
      <Text size="xl" bold="bold" pad>
        {title}
      </Text>
      <IdentifierCheckBox
        title={'New notifications'}
        noMargin
        noPad={false}
        disable={disable}
        defaultValue={email.relatedPosts.new}
        onChange={(check) => setEmail({ relatedPosts: { new: check } })}
      />
      <IdentifierCheckBox
        title={'Direct messages'}
        noMargin
        noPad={false}
        disable={disable}
        defaultValue={email.relatedPosts.direct}
        onChange={(check) => setEmail({ relatedPosts: { direct: check } })}
      />
      <IdentifierCheckBox
        title={'Posts emailed to you'}
        noMargin
        noPad={false}
        disable={disable}
        defaultValue={email.relatedPosts.posts}
        onChange={(check) => setEmail({ relatedPosts: { posts: check } })}
      />
      <div className={utils.p_basic}>
        <IdentifierRadioBox
          title="Top posts and Stories"
          name="top"
          data={[
            { id: 'daily', title: 'Daily' },
            { id: 'weekly', title: 'Weekly' },
            { id: 'periodically', title: 'Periodically' },
            { id: 'off', title: 'Off' },
          ]}
          noPad
          disable={disable}
          defaultValue={email.relatedPosts.stories}
          onChange={(value) => {
            if (
              value === 'daily' ||
              value === 'weekly' ||
              value === 'periodically' ||
              value === 'off'
            ) {
              setEmail({ relatedPosts: { stories: value } });
            }
          }}
        />
      </div>
      <IdentifierCheckBox
        title={'Updates about the performance of your posts'}
        noMargin
        noPad={false}
        disable={disable}
        defaultValue={email.relatedPosts.update}
        onChange={(value) => setEmail({ relatedPosts: { update: value } })}
      />
    </div>
  );
}
