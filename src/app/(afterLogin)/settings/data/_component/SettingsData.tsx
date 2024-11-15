'use client';

import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import SettingsSubMenu from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import useSettingsLocalStore, {
  DataSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';

export default function SettingsData() {
  const { data, setData } = useSettingsLocalStore(DataSelector);

  return (
    <div>
      <IdentifierCheckBox
        title={'Data saver'}
        sub={'If selected, X will use less network data.'}
        noMargin
        noPad={false}
        defaultValue={data.saver}
        onChange={(value) => setData({ saver: value })}
      />
      <SettingsSubMenu
        type="link"
        href="/settings/autoplay"
        title="Autoplay"
        sub={'On cellular or Wi-Fi'}
      />
    </div>
  );
}
