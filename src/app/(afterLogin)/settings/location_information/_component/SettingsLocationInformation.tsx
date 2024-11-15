'use client';

import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import SettingsSubMenu from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import useSettingsLocalStore, {
  locationSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';

export default function SettingsLocationInformation() {
  const { location, setLocation } = useSettingsLocalStore(locationSelector);

  return (
    <div>
      <IdentifierCheckBox
        title={'Personalize based on places you’ve been'}
        sub={
          'X always uses some information, like where you signed up and your current location, to help show you more relevant content. When this setting is enabled, X may also personalize your experience based on other places you’ve been.'
        }
        noPad={false}
        noMargin
        defaultValue={location.personalize}
        onChange={(value) => setLocation({ personalize: value })}
      />
      <SettingsSubMenu
        type="link"
        href="/settings/your_twitter_data/locations"
        title="See places you’ve been"
      />
      <SettingsSubMenu
        type="link"
        href="/settings/location"
        title="Add location information to your posts"
      />
      <SettingsSubMenu
        type="link"
        href="/settings/explore"
        title="Explore settings"
      />
    </div>
  );
}
