'use client';

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import TransitionTextButton from '@/app/(afterLogin)/_component/buttons/TransitionTextButton';
import useSettingsLocalStore, {
  locationSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import SettingsSubMenu from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import Text from '@/app/_component/_text/Text';
import DivideLine from '@/app/_component/_util/DivideLine';
import LocationSvg from '@/app/_svg/tweet/LocationSvg';
import useConfirmStore, {
  confirmSelector,
} from '@/app/(afterLogin)/_store/ConfirmStore';

export default function SettingsYourLocation() {
  const { location, setLocation } = useSettingsLocalStore(locationSelector);
  const { open, close } = useConfirmStore(confirmSelector);

  const onClickRemove = () => {
    open({
      flag: true,
      title: 'Remove places you’ve been?',
      sub: 'This will take some time, and can’t be undone.',
      btnText: 'Remove',
      btnTheme: 'red',
      onClickCancle: () => {
        close();
      },
      onClickConfirm: () => {
        close();
        setLocation({ history: [] });
      },
    });
  };

  return (
    <div>
      {location.history.length !== 0 ? (
        <>
          <div className={cx(utils.bd_t_1_solid_gray, utils.bd_b_1_solid_gray)}>
            {location.history.map((v, i) => (
              <SettingsSubMenu
                key={i}
                type="button"
                svg={
                  <div
                    className={cx(
                      utils.mr_12,
                      utils.d_flexRow,
                      utils.flex_alignCenter,
                      utils.flex_justiCenter,
                      utils.w_40,
                      utils.h_40,
                      utils.bg_theme,
                      utils.bd_1_solid_gray,
                      utils.br_9999
                    )}
                  >
                    <LocationSvg theme="theme" />
                  </div>
                }
                title={v}
                select="none"
                arrow="none"
              />
            ))}
          </div>
          <TransitionTextButton
            type="button"
            text="Remove"
            theme="error"
            onClick={onClickRemove}
          />
        </>
      ) : (
        <>
          <DivideLine />
          <Text className={cx(utils.pa_20)} size="xl" align="center">
            No places currently found.
          </Text>
        </>
      )}
    </div>
  );
}
