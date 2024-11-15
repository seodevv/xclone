'use client';

import utils from '@/app/utility.module.css';
import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import Link from 'next/link';
import SettingsSubMenu from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import useSettingsLocalStore, {
  AdsPreferencesSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';

export default function SettingsAdsPreferences() {
  const { adsPreferences, setAdsPreferences } = useSettingsLocalStore(
    AdsPreferencesSelector
  );

  return (
    <div>
      <IdentifierCheckBox
        title={'Personalized ads'}
        sub={
          <>
            You will always see ads on X based on your X activity. When this
            setting is enabled, X may further personalize ads from X
            advertisers, on and off X, by combining your X activity with other
            online activity and information from our partners.&nbsp;
            <Link
              className={utils.link}
              href={
                'https://help.x.com/safety-and-security/privacy-controls-for-tailored-ads'
              }
              target="_blank"
            >
              Learn more
            </Link>
          </>
        }
        noPad={false}
        defaultValue={adsPreferences}
        onChange={(value) => setAdsPreferences(value)}
      />
      <SettingsSubMenu
        type="link"
        href="/settings/your_twitter_data/twitter_interests"
        title="Interests"
      />
      <SettingsSubMenu
        type="link"
        href="/settings/your_twitter_data/audiences"
        title="Your advertiser list"
      />
    </div>
  );
}
