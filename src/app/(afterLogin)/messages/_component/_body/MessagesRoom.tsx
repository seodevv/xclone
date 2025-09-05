'use client';

import styles from './messages.body.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import { AdvancedRooms } from '@/model/Room';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { MouseEventHandler, useContext, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import OtherProfile from '@/app/(afterLogin)/_component/profile/OtherProfile';
import MessagesRoomInformation from '@/app/(afterLogin)/messages/_component/_body/MessagesRoomInformation';
import MessagesRoomNotification from '@/app/(afterLogin)/messages/_component/_body/MessagesRoomNotification';
import MessagesRoomOption from '@/app/(afterLogin)/messages/_component/_body/MessagesRoomOption';
import { MessagesSearchContext } from '@/app/(afterLogin)/messages/_component/_body/_search/_provider/MessagesSearchProvider';

dayjs.locale('en');
dayjs.extend(relativeTime);

interface Props {
  sessionId: string;
  room: AdvancedRooms;
}

export default function MessagesRoom({ sessionId, room }: Props) {
  const segment = useSelectedLayoutSegment();
  const router = useRouter();
  const [mouseOver, setMouseOver] = useState(false);
  const roomActive = segment === room.id;
  const receiver = room.senderid === sessionId ? room.Receiver : room.Sender;

  const onClickMessage: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/messages/${room.id}`);
  };

  const { active: searchActive } = useContext(MessagesSearchContext);

  if (room.Disabled) return null;
  if (searchActive) return null;

  return (
    <div
      className={cx(utils.relative, utils.d_flexColumn, utils.cursor_point)}
      onClick={onClickMessage}
      onMouseOver={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      {roomActive && (
        <div
          className={cx(
            utils.absolute,
            utils.t_r_b_l_0,
            utils.bw_r_2,
            utils.bs_r_solid,
            utils.bc_r_primary
          )}
        ></div>
      )}
      <div
        className={cx(
          utils.d_flexColumn,
          utils.transit_basic,
          mouseOver && styles.mouseOver
        )}
      >
        <div
          className={cx(
            utils.pa_16,
            utils.w_100p,
            utils.transit_basic,
            utils.cursor_point,
            mouseOver && styles.mouseOver_2,
            roomActive && styles.active
          )}
        >
          <div className={utils.d_flexRow}>
            <div
              className={cx(
                utils.mr_8,
                utils.relative,
                utils.d_flexColumn,
                utils.flexBasis_40,
                utils.flexGrow_0,
                utils.w_min_40,
                utils.br_50,
                utils.of_hide
              )}
            >
              <OtherProfile mode="single" user={receiver} width={40} />
            </div>
            <div className={cx(utils.d_flexRow, utils.flex_1, utils.w_min_0)}>
              <div
                className={cx(
                  utils.d_flexRow,
                  utils.flexGrow_1,
                  utils.flexShrink_1,
                  utils.w_min_0
                )}
              >
                <MessagesRoomInformation
                  receiver={
                    room.senderid === sessionId ? room.Receiver : room.Sender
                  }
                  lastMessage={{
                    type: room.type,
                    at: room.lastat,
                    content: room.content,
                  }}
                  Snooze={room.Snooze}
                />
                <MessagesRoomNotification
                  sessionId={sessionId}
                  sent={room.sent}
                />
                <MessagesRoomOption room={room} active={mouseOver} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
