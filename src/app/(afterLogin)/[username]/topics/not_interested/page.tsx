import styles from './userTopicsNotInterested.page.module.css';
import utils from '@/app/utility.module.css';
import Text from '@/app/_component/_text/Text';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Topics / XClone',
};

export default function UserTopicsNotInterestedPage() {
  return (
    <div className={styles.container}>
      <div className={styles.flex_column}>
        <Text className={utils.mb_8} size="xxxxl" bold="boldest">
          No interest? No problem.
        </Text>
        <Text className={utils.mb_28} theme="gray">
          When you tell us you're not interested in a Topic, it will show up
          here. We won't recommend Tweets, events, or ads related to Topics you
          aren't into.
        </Text>
      </div>
    </div>
  );
}
