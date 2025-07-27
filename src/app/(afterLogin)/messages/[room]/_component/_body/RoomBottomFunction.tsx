'use client';

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import Text from '@/app/_component/_text/Text';
import { useContext } from 'react';
import DownArrowSvg from '@/app/_svg/arrow/DownArrowSvg';
import { WebSocketContext } from '@/app/(afterLogin)/messages/[room]/_provider/WebSocketProvider';
import { MessagesScrollContext } from '@/app/(afterLogin)/messages/[room]/_provider/MessagesScrollProvider';

export default function RoomBottomFunction() {
  const { status } = useContext(WebSocketContext);
  const { info, setScroll } = useContext(MessagesScrollContext);

  const onClickButton = () => {
    setScroll('bottom');
  };

  const buttonClass = cx(
    utils.prl_16,
    utils.w_min_36,
    utils.h_min_36,
    utils.bg_theme,
    utils.hover_bg_gray,
    utils.active_bg_gray,
    utils.box_basic,
    utils.bd_1_solid_gray,
    utils.br_9999,
    utils.outline_none,
    utils.transit_opacity,
    utils.cursor_point,
    info.position === 'bottom' ? utils.opacity_0 : utils.opacity_1
  );

  return (
    <div
      className={cx(
        utils.pr_32,
        utils.absolute,
        utils.b_12,
        info.position === 'bottom' ? utils.zIndex_xs : utils.zIndex_m,
        utils.d_flexRow,
        status.flag === 'new' ? utils.flex_justiCenter : utils.flex_justiEnd
      )}
      style={{
        width: 'calc(100% - 32px)',
      }}
    >
      {status.flag === 'new' ? (
        // New messages
        <button className={buttonClass} onClick={onClickButton}>
          <Text theme="primary" bold="bold">
            <span>▼ New messages</span>
          </Text>
        </button>
      ) : (
        // Set bottom
        <button className={buttonClass} onClick={onClickButton}>
          <DownArrowSvg type="line" theme="primary" width={18.75} />
        </button>
      )}
    </div>
  );
}
