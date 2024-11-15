'use client';

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import Text from '@/app/_component/_text/Text';
import DivideLine from '@/app/_component/_util/DivideLine';
import Link from 'next/link';
import IdentifierRadioBox from '@/app/_component/_input/IdentifierRadioBox';
import useSettingsLocalStore, {
  PushNotificationsSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';

export default function PushNotificationsOptionsFromXRelatedPosts() {
  const { push, setPushNotifications } = useSettingsLocalStore(
    PushNotificationsSelector
  );
  return (
    <>
      <DivideLine />
      <Text size="xl" bold="bold" pad>
        Related to you and your posts
      </Text>
      <IdentifierCheckBox
        title={'Posts'}
        sub={
          <>
            When you turn on post notifications from people you follow, you’ll
            get push notifications about their posts or live videos.&nbsp;
            <Link className={utils.link} href={'/settings/device_follow'}>
              View users
            </Link>
          </>
        }
        noMargin
        noPad={false}
        defaultValue={push.relatedPosts.posts}
        onChange={(value) =>
          setPushNotifications({ relatedPosts: { posts: value } })
        }
      />
      <div className={utils.p_basic}>
        <Text className={cx(utils.pt_12, utils.pb_4)} bold="bold">
          Mentions and replies
        </Text>
        <IdentifierRadioBox
          name="mentions"
          data={[
            { id: 'tailored', title: 'Tailored for you' },
            { id: 'anyone', title: 'From anyone' },
            { id: 'off', title: 'Off' },
          ]}
          noPad
          defaultValue={push.relatedPosts.mentions}
          onChange={(value) => {
            if (value === 'tailored' || value === 'anyone' || value === 'off') {
              setPushNotifications({ relatedPosts: { mentions: value } });
            }
          }}
        />
      </div>
      <div className={utils.p_basic}>
        <Text className={cx(utils.pt_12, utils.pb_4)} bold="bold">
          Reposts
        </Text>
        <IdentifierRadioBox
          name="reposts"
          data={[
            { id: 'tailored', title: 'Tailored for you' },
            { id: 'anyone', title: 'From anyone' },
            { id: 'off', title: 'Off' },
          ]}
          noPad
          defaultValue={push.relatedPosts.reposts}
          onChange={(value) => {
            if (value === 'tailored' || value === 'anyone' || value === 'off') {
              setPushNotifications({ relatedPosts: { reposts: value } });
            }
          }}
        />
      </div>
      <div className={utils.p_basic}>
        <Text className={cx(utils.pt_12, utils.pb_4)} bold="bold">
          Likes
        </Text>
        <IdentifierRadioBox
          name="likes"
          data={[
            { id: 'tailored', title: 'Tailored for you' },
            { id: 'anyone', title: 'From anyone' },
            { id: 'off', title: 'Off' },
          ]}
          noPad
          defaultValue={push.relatedPosts.likes}
          onChange={(value) => {
            if (value === 'tailored' || value === 'anyone' || value === 'off') {
              setPushNotifications({ relatedPosts: { likes: value } });
            }
          }}
        />
      </div>
      <IdentifierCheckBox
        title={'Photo tags'}
        noMargin
        noPad={false}
        defaultValue={push.relatedPosts.photoTags}
        onChange={(value) =>
          setPushNotifications({ relatedPosts: { photoTags: value } })
        }
      />
      <IdentifierCheckBox
        title={'New followers'}
        noMargin
        noPad={false}
        defaultValue={push.relatedPosts.newFollowers}
        onChange={(value) =>
          setPushNotifications({ relatedPosts: { newFollowers: value } })
        }
      />
      <IdentifierCheckBox
        title={'Direct Messages'}
        noMargin
        noPad={false}
        defaultValue={push.relatedPosts.directMessages}
        onChange={(value) =>
          setPushNotifications({ relatedPosts: { directMessages: value } })
        }
      />
      <div className={utils.p_basic}>
        <Text className={cx(utils.pt_12, utils.pb_4)} bold="bold">
          Message reactions
        </Text>
        <IdentifierRadioBox
          name="reactions"
          data={[
            { id: 'own', title: 'Your own message' },
            { id: 'everyone', title: "Everyone's messages" },
            { id: 'off', title: 'Off' },
          ]}
          noPad
          defaultValue={push.relatedPosts.messageReactions}
          onChange={(value) => {
            if (value === 'own' || value === 'everyone' || value === 'off') {
              setPushNotifications({
                relatedPosts: { messageReactions: value },
              });
            }
          }}
        />
      </div>
      <IdentifierCheckBox title={'Contact joins X'} noMargin noPad={false} />
    </>
  );
}
