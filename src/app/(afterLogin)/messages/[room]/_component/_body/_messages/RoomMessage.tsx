'use client';

import styles from './room.message.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import { AdvancedMessages } from '@/model/Message';
import { MouseEventHandler } from 'react';
import RoomMessageAction from '@/app/(afterLogin)/messages/[room]/_component/_body/_messages/RoomMessageAction';
import RoomMessageReaction from '@/app/(afterLogin)/messages/[room]/_component/_body/_messages/RoomMessageReaction';
import RoomMessageDateSeen from '@/app/(afterLogin)/messages/[room]/_component/_body/_messages/RoomMessageDateSeen';
import RoomMessageParent from '@/app/(afterLogin)/messages/[room]/_component/_body/_messages/RoomMessageParent';
import RoomMessageContent from '@/app/(afterLogin)/messages/[room]/_component/_body/_messages/RoomMessageContent';
import RoomMessageMedia from '@/app/(afterLogin)/messages/[room]/_component/_body/_messages/RoomMessageMedia';
import RoomMessageFailed from '@/app/(afterLogin)/messages/[room]/_component/_body/_messages/RoomMessageFailed';

interface Props {
  sessionId: string;
  message: AdvancedMessages;
  date: RoomDate;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export type RoomOwn = 'mine' | 'thine';
export type RoomDate = {
  present?: boolean;
  lastSent?: boolean;
  lastSeen?: boolean;
  selected?: boolean;
};

export default function RoomMessage({
  sessionId,
  message,
  date,
  onClick,
}: Props) {
  const own: RoomOwn = sessionId === message.senderid ? 'mine' : 'thine';

  return (
    <div
      className={cx(
        utils.d_flexColumn,
        utils.w_100p,
        own === 'thine' ? utils.cursor_default : utils.cursor_point,
        styles.container
      )}
      onClick={onClick}
    >
      <div
        className={cx(
          date.present ? utils.pb_24 : utils.pb_0,
          utils.d_flexColumn,
          own === 'thine' ? utils.flex_alignStart : utils.flex_alignEnd
        )}
      >
        <div
          className={cx(
            own === 'thine' ? utils.pr_12 : utils.pl_12,
            styles.width,
            styles.message,
            own === 'thine' && styles.you
          )}
        >
          {message.status !== 'failed' && (
            <RoomMessageAction message={message} sessionid={sessionId} />
          )}
          <div
            className={cx(
              utils.d_flexColumn,
              utils.flex_alignEnd,
              message.Media && utils.flex_1
            )}
          >
            <RoomMessageParent Parent={message.Parent} own={own} />
            <div
              className={cx(utils.d_flexColumn, utils.w_100p, utils.opacity_1)}
            >
              <RoomMessageMedia media={message.Media} />
              <RoomMessageContent
                content={message.content}
                Media={message.Media}
                selected={date.selected}
                failed={message.status === 'failed'}
                own={own}
              />
            </div>
          </div>
        </div>
        <div
          className={cx(
            utils.d_flexColumn,
            own === 'thine'
              ? utils.flex_alignSelfStart
              : utils.flex_alignSelfEnd,
            utils.flex_justiEnd,
            utils.of_hide,
            styles.width
          )}
        >
          <RoomMessageReaction
            message={message}
            sessionId={sessionId}
            own={own}
          />
          {message.status !== 'failed' ? (
            <RoomMessageDateSeen message={message} status={date} own={own} />
          ) : (
            <RoomMessageFailed
              sessionId={sessionId}
              message={message}
              own={own}
            />
          )}
        </div>
      </div>
    </div>
  );
}
