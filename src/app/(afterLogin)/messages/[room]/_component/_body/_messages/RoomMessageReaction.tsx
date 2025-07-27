'use client';

import { useMyProfileQuery } from '@/app/(afterLogin)/_hooks/useMyProfileQuery';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import { RoomOwn } from '@/app/(afterLogin)/messages/[room]/_component/_body/_messages/RoomMessage';
import { WebSocketContext } from '@/app/(afterLogin)/messages/[room]/_provider/WebSocketProvider';
import Text from '@/app/_component/_text/Text';
import utils from '@/app/utility.module.css';
import { AdvancedMessages } from '@/model/Message';
import cx from 'classnames';
import { MouseEventHandler, useContext } from 'react';

interface Props {
  message: AdvancedMessages;
  sessionId: string;
  own?: RoomOwn;
}

interface Emoji {
  [key: string]: string[];
}

export default function RoomMessageReaction({
  message,
  sessionId,
  own = 'mine',
}: Props) {
  const { dispatchMenu, close } = useContext(SubMenuContext);
  const { sendReaction } = useContext(WebSocketContext);
  const { data: myProfile } = useMyProfileQuery();

  const emojis: Emoji = {};
  message.React.sort((a) => (a.id === sessionId ? -1 : 1)).forEach((r) => {
    if (!Array.isArray(emojis[r.content])) {
      emojis[r.content] = [r.id];
    } else {
      emojis[r.content].push(r.id);
    }
  });

  const onClickReaction: MouseEventHandler<HTMLButtonElement> = (e) => {
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
          type: 'message_reaction_info',
          message,
          sessionid: sessionId,
          callback: (react) => {
            sendReaction({
              type: 'undo',
              roomid: message.roomid,
              messageid: message.id,
              content: react.content,
              session: {
                id,
                nickname,
                image,
                verified,
              },
            });
            close();
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

  return (
    <div
      className={cx(
        utils.mb_4,
        utils.d_flexColumn,
        own === 'thine' ? utils.flex_alignStart : utils.alignself_end,
        utils.opacity_1
      )}
    >
      {message.React.length !== 0 && (
        <button
          className={cx(
            utils.d_flexRow,
            utils.bg_trans,
            utils.hover_bg_gray_light,
            utils.active_bg_gray_light,
            utils.bd_1_solid_trans,
            utils.br_9999,
            utils.outline_none,
            utils.transit_basic,
            utils.cursor_point
          )}
          onClick={onClickReaction}
        >
          <div
            className={cx(
              utils.pt_2,
              utils.pr_2,
              utils.pb_2,
              utils.pl_4,
              utils.d_flexRow,
              utils.br_9999
            )}
          >
            {Object.entries(emojis).map(([key, value]) => (
              <div
                key={key}
                className={cx(utils.d_flexRow, utils.flex_alignCenter)}
              >
                <Text size="xxxl">{key}</Text>
                {value.length !== 1 && (
                  <Text className={utils.pl_2} size="fs_11" theme="gray">
                    {value.length}
                  </Text>
                )}
              </div>
            ))}
          </div>
        </button>
      )}
    </div>
  );
}
