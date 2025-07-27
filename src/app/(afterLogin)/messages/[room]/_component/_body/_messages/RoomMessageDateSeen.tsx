'use client';

import {
  RoomDate,
  RoomOwn,
} from '@/app/(afterLogin)/messages/[room]/_component/_body/_messages/RoomMessage';
import Text from '@/app/_component/_text/Text';
import { DAY_EN, MONTH_EN } from '@/app/_lib/common';
import utils from '@/app/utility.module.css';
import { AdvancedMessages } from '@/model/Message';
import cx from 'classnames';

interface Props {
  message: Pick<AdvancedMessages, 'createat' | 'seen'>;
  status: RoomDate;
  own: RoomOwn;
}

export default function RoomMessageDateSeen({
  message,
  status: { present, selected, lastSent, lastSeen },
  own,
}: Props) {
  const generateMessageTime = (message_date: Date) => {
    const year = message_date.getFullYear();
    const month = message_date.getMonth();
    const date = message_date.getDate();
    const day = message_date.getDay();
    const hours = message_date.getHours();
    const minute = message_date.getMinutes();
    const amPm = hours > 12 ? 'Pm' : 'Am';

    const now = new Date();
    const standard = new Date(
      `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
    );
    const diff =
      (standard.getTime() - message_date.getTime()) / (1000 * 60 * 60 * 24);
    const time = `${
      hours > 12 ? hours - 12 : hours
    }:${minute} ${amPm.toLocaleUpperCase()}`;

    if (diff <= 0) {
      return time;
    } else if (diff > 0 && diff <= 1) {
      return `Yesterday, ${time}`;
    } else if (diff > 1 && diff <= 7) {
      return `${DAY_EN[day].substring(0, 3)} ${time}`;
    } else {
      return `${MONTH_EN[month].substring(0, 3)} ${date}, ${year}, ${time}`;
    }
  };

  return (
    <div
      className={cx(
        utils.d_flexColumn,
        own === 'thine' ? utils.flex_alignStart : utils.flex_alignEnd,
        utils.transit_basic
      )}
    >
      <div
        className={cx(
          utils.d_flexRow,
          utils.flex_alignBase,
          utils.flex_justiEnd,
          utils.flexShrink_1
        )}
      >
        {present && (
          <>
            <Text theme="gray" size="xs" align="right">
              <span>{generateMessageTime(new Date(message.createat))}</span>
            </Text>
            {(selected || lastSent || lastSeen) && (
              <Text className={cx(utils.mrl_4)} theme="gray" size="xs">
                ·
              </Text>
            )}
          </>
        )}
        {(selected || lastSent || lastSeen) && (
          <Text className={utils.mb_4} theme="gray" size="xs">
            <span>{message.seen ? 'Seen' : 'Sent'}</span>
          </Text>
        )}
      </div>
    </div>
  );
}
