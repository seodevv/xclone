'use client';

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import TransitionTextButton from '@/app/(afterLogin)/_component/buttons/TransitionTextButton';
import { ConfirmContext } from '@/app/(afterLogin)/_provider/ConfirmProvider';
import useSettingsLocalStore, {
  locationSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import SettingsSubMenu from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import Text from '@/app/_component/_text/Text';
import DivideLine from '@/app/_component/_util/DivideLine';
import LocationSvg from '@/app/_svg/tweet/LocationSvg';
import { useContext } from 'react';

export default function SettingsYourLocation() {
  const { location, setLocation } = useSettingsLocalStore(locationSelector);
  const { dispatchModal, close } = useContext(ConfirmContext);

  const onClickRemove = () => {
    dispatchModal({
      type: 'setCustom',
      payload: {
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
                    <LocationSvg white />
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
