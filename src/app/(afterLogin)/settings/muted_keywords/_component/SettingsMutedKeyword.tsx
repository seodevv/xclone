'use client';

import utils from '@/app/utility.module.css';
import PageNotice from '@/app/(afterLogin)/_component/_page/PageNotice';
import useSettingsLocalStore, {
  MuteSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import Link from 'next/link';
import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import DivideLine from '@/app/_component/_util/DivideLine';
import SettingsMutedWords from '@/app/(afterLogin)/settings/muted_keywords/_component/SettingsMutedWords';

export default function SettingsMutedKeyword() {
  const { mute } = useSettingsLocalStore(MuteSelector);

  if (mute.length === 0) {
    return (
      <PageNotice
        title={'Add muted words'}
        sub={
          <>
            When you mute words, you won’t get any new notifications for posts
            that include them or see posts with those words in your Home
            timeline.&nbsp;
            <Link
              className={utils.link}
              href={'https://help.x.com/using-x/advanced-x-mute-options'}
              target="_blank"
            >
              Learn more
            </Link>
          </>
        }
      />
    );
  }

  return (
    <div>
      <SettingsInform
        inform={
          <>
            When you mute words, you won’t get any new notifications for posts
            that include them or see posts with those words in your Home
            timeline.&nbsp;
            <Link
              className={utils.link}
              href={'https://help.x.com/using-x/advanced-x-mute-options'}
              target="_blank"
            >
              Learn more
            </Link>
          </>
        }
        size="xs"
      />
      <DivideLine />
      <SettingsMutedWords />
    </div>
  );
}
