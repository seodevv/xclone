'use client';

import utils from '@/app/utility.module.css';
import { useMyProfileQuery } from '@/app/(afterLogin)/_hooks/useMyProfileQuery';
import Link from 'next/link';
import Text from '@/app/_component/_text/Text';
import DivideLine from '@/app/_component/_util/DivideLine';

export default function YourAge() {
  const { data: user } = useMyProfileQuery();
  const date = user?.data.birth ? new Date(user.data.birth.date) : undefined;

  return (
    <div>
      <Text className={utils.p_basic} theme="gray">
        If you haven’t provided a date of birth, we’ve provided an age range
        based on your X profile and activity. Age information is used to
        personalize your experience.&nbsp;
        <Link
          className={utils.link}
          href="https://help.x.com/ko/safety-and-security/birthday-visibility-settings"
          target="_blank"
        >
          Learn more
        </Link>
      </Text>
      <DivideLine />
      <Text className={utils.p_basic}>
        {date
          ? ~~((Date.now() - date.getTime()) / 1000 / 60 / 60 / 24 / 365)
          : '13-54'}
      </Text>
      <DivideLine />
      <Text className={utils.p_basic} theme="gray">
        Not right? You can add your date of birth to your profile without
        sharing it publicly.
      </Text>
    </div>
  );
}
