'use client';

import utils from '@/app/utility.module.css';
import Text from '@/app/_component/_text/Text';
import DivideLine from '@/app/_component/_util/DivideLine';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function UserTopicsFollowed() {
  const segment = useSelectedLayoutSegment();

  if (segment === 'not_interested') {
    return null;
  }

  return (
    <div>
      <Text className={utils.p_basic} theme="gray">
        The Topics you follow are used to personalize the posts, events, and ads
        that you see, and show up publicly on your profile
      </Text>
      <DivideLine />
      <Text className={utils.p_basic} theme="gray">
        Topics that you follow are shown here. To see all the things that X
        thinks you’re interested in, check out&nbsp;
        <Link className={utils.link} href={'/settings/your_twitter_data'}>
          Your X data
        </Link>
        . You can also&nbsp;
        <Link
          className={utils.link}
          href={'https://help.x.com/using-x/follow-and-unfollow-topics'}
          target="_blank"
        >
          learn more
        </Link>
        &nbsp;about following Topics.
      </Text>
    </div>
  );
}
