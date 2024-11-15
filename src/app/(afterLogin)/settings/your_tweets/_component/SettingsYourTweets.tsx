'use client';

import useSettingsLocalStore, {
  sensitiveSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import SettingsSubMenu from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import utils from '@/app/utility.module.css';
import Link from 'next/link';

export default function SettingsYourTweets() {
  const { sensitive, setSensitive } = useSettingsLocalStore(sensitiveSelector);

  const onChangeCheckBox = (value: boolean) => {
    setSensitive({ post: value });
  };

  return (
    <div>
      <div className={utils.p_basic}>
        <IdentifierCheckBox
          title="Mark media you post as having material that may be sensitive"
          sub={
            <>
              When enabled, pictures and videos you post will be marked as
              sensitive for people who don’t want to see sensitive
              content.&nbsp;
              <Link
                className={utils.link}
                href={'https://help.x.com/rules-and-policies/adult-conten'}
                target="_blank"
              >
                Learn more
              </Link>
            </>
          }
          defaultValue={sensitive.post}
          onChange={onChangeCheckBox}
        />
      </div>
      <SettingsSubMenu
        type="link"
        href="/settings/location"
        title="Add location information to your posts"
      />
    </div>
  );
}
