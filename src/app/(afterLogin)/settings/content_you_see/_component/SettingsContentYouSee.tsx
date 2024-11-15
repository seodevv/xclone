'use client';

import { useMyProfileQuery } from '@/app/(afterLogin)/_hooks/useMyProfileQuery';
import useSettingsLocalStore, {
  sensitiveSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import SettingsSubMenu, {
  ISettingsSubMenu,
} from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import utils from '@/app/utility.module.css';

export default function SettingsContentYouSee() {
  const { data: user } = useMyProfileQuery();
  const { sensitive, setSensitive } = useSettingsLocalStore(sensitiveSelector);
  const subMenus: ISettingsSubMenu[] = [
    { id: 0, type: 'link', href: `/${user?.data.id}/topics`, title: 'Topics' },
    {
      id: 1,
      type: 'link',
      href: '/settings/your_twitter_data/twitter_interests',
      title: 'Interests',
    },
    {
      id: 2,
      type: 'link',
      href: '/settings/explore',
      title: 'Explore settings',
    },
    { id: 3, type: 'link', href: '/settings/search', title: 'Search settings' },
  ];

  const onChangeCheck = (value: boolean) => {
    setSensitive({ media: value });
  };

  return (
    <div>
      <div className={utils.p_basic}>
        <IdentifierCheckBox
          title={'Display media that may contain sensitive content'}
          defaultValue={sensitive.media}
          onChange={onChangeCheck}
        />
      </div>
      {subMenus.map((v) => (
        <SettingsSubMenu
          key={v.id}
          type={v.type}
          href={v.href}
          title={v.title}
        />
      ))}
    </div>
  );
}
