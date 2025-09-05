'use client';

import styles from './messages.body.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import { MouseEventHandler, useContext } from 'react';
import OptionSvg from '@/app/_svg/post/OptionSvg';
import { AdvancedRooms } from '@/model/Room';

interface Props {
  room: AdvancedRooms;
  active?: boolean;
}

export default function MessagesRoomOption({ room, active }: Props) {
  const { dispatchMenu: setSubMenu } = useContext(SubMenuContext);

  const onClickOption: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
    setSubMenu({
      type: 'set',
      payload: {
        flag: true,
        status: { type: 'room', room },
        position: {
          x,
          y,
          width,
          height,
          target: e.currentTarget,
        },
      },
    });
  };

  return (
    <div
      className={cx(
        utils.ml_10,
        utils.relative,
        utils.d_flexColumn,
        utils.flexShrink_0,
        utils.w_min_0,
        utils.h_0
      )}
    >
      {active && (
        <button
          className={cx(
            utils.d_flexColumn,
            utils.flex_alignCenter,
            utils.flex_justiCenter,
            utils.alignself_center,
            utils.w_min_32,
            utils.h_min_32,
            utils.bg_trans,
            utils.bd_none,
            utils.br_50,
            utils.cursor_point,
            styles.option
          )}
          style={{ alignSelf: 'center' }}
          onClick={onClickOption}
        >
          <OptionSvg width={18.75} theme="inherit" />
        </button>
      )}
    </div>
  );
}
