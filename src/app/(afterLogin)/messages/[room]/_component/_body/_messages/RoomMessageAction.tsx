'use client';

import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import styles from './room.message.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import { MouseEventHandler, useContext } from 'react';
import { AdvancedMessages } from '@/model/Message';
import HeartPlusSvg from '@/app/_svg/post/HeartPlusSvg';
import OptionSvg from '@/app/_svg/post/OptionSvg';
import { WebSocketContext } from '@/app/(afterLogin)/messages/[room]/_provider/WebSocketProvider';
import { useMyProfileQuery } from '@/app/(afterLogin)/_hooks/useMyProfileQuery';

interface Props {
  message: AdvancedMessages;
  sessionid: string;
}

export default function RoomMessageAction({ message, sessionid }: Props) {
  const { menu, dispatchMenu } = useContext(SubMenuContext);
  const { sendReaction } = useContext(WebSocketContext);
  const { data: myProfile } = useMyProfileQuery();

  const onClickHeartPlus: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof myProfile === 'undefined') return;

    const { id, nickname, image, verified } = myProfile.data;
    const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
    dispatchMenu({
      type: 'set',
      payload: {
        flag: true,
        status: {
          type: 'message_reaction_add',
          message,
          sessionid,
          callback: (emoji, selected) => {
            sendReaction({
              type: selected ? 'undo' : 'add',
              roomid: message.roomid,
              messageid: message.id,
              content: emoji,
              session: {
                id,
                nickname,
                image,
                verified,
              },
            });
          },
        },
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
  const onClickOption: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
    dispatchMenu({
      type: 'set',
      payload: {
        flag: true,
        status: {
          type: 'message_option',
          message,
        },
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
        styles.action,
        menu.status.type === 'message_reaction_add' &&
          menu.status.message.id === message.id &&
          utils.opacity_1
      )}
    >
      <button
        className={cx(utils.transit_basic, styles.button)}
        onClick={onClickHeartPlus}
      >
        <HeartPlusSvg width={20} />
      </button>
      <button
        className={cx(utils.transit_basic, styles.button)}
        onClick={onClickOption}
      >
        <OptionSvg width={20} />
      </button>
    </div>
  );
}
