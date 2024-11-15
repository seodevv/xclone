'use client';

import useSettingsLocalStore, {
  ExploreSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import Text from '@/app/_component/_text/Text';
import DivideLine from '@/app/_component/_util/DivideLine';
import modalStyles from '@/app/modal.module.css';
import utils from '@/app/utility.module.css';

export default function SettingsExplore() {
  const { explore, setExplore } = useSettingsLocalStore(ExploreSelector);

  return (
    <div className={modalStyles.container}>
      <div className={modalStyles.body}>
        <Text className={utils.p_basic} size="xl" bold="bold">
          Location
        </Text>
        <div className={utils.p_basic}>
          <IdentifierCheckBox
            title={'Show content in this location'}
            sub={
              'When this is on, you’ll see what’s happening around you right now.'
            }
            defaultValue={explore.showLocation}
            onChange={(value) => {
              setExplore({ showLocation: value });
            }}
            noMargin
          />
        </div>
        <DivideLine />
        <Text className={utils.p_basic} size="xl" bold="bold">
          Personalization
        </Text>
        <div className={utils.p_basic}>
          <IdentifierCheckBox
            title={'Trends for you'}
            sub={
              'You can personalize trends based on your location and who you follow.'
            }
            defaultValue={explore.trendsForYou}
            onChange={(value) => {
              setExplore({ trendsForYou: value });
            }}
            noMargin
          />
        </div>
      </div>
    </div>
  );
}
