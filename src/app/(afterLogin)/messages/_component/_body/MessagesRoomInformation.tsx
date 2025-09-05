import utils from '@/app/utility.module.css';
import cx from 'classnames';
import Text from '@/app/_component/_text/Text';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { SafeUser } from '@/model/User';
import { AdvancedRooms } from '@/model/Room';
import { snoozeHandler } from '@/app/(afterLogin)/messages/[room]/info/_component/RoomMessageInfoNotifications';
import AlarmSvg from '@/app/_svg/post/AlarmSvg';

dayjs.locale('en');
dayjs.extend(relativeTime);

interface Props {
  receiver: SafeUser;
  lastMessage: {
    type: AdvancedRooms['type'];
    at: AdvancedRooms['lastat'];
    content: AdvancedRooms['content'];
  };
  Snooze: AdvancedRooms['Snooze'];
  active?: boolean;
}

export default function MessagesRoomInformation({
  receiver,
  lastMessage,
  Snooze,
  active,
}: Props) {
  return (
    <div
      className={cx(
        utils.d_flexColumn,
        utils.flexShrink_1,
        utils.flex_1,
        utils.w_min_0
      )}
    >
      <div className={cx(utils.d_flexRow)}>
        <div className={cx(utils.d_flexRow, utils.flexShrink_1, utils.w_min_0)}>
          <Text
            size="m"
            bold="bold"
            theme="theme"
            wordWrap="break-word"
            whiteSpace="nowrap"
            overflow="ellipsis"
            of="hide"
          >
            {receiver.nickname}
          </Text>
          <Text
            className={cx(utils.ml_4)}
            size="m"
            bold="normal"
            theme="gray"
            wordWrap="break-word"
            whiteSpace="nowrap"
            overflow="ellipsis"
            of="hide"
          >
            @{receiver.id}
          </Text>
        </div>
        {lastMessage.at && (
          <div className={cx(utils.d_flexRow, utils.flexShrink_0)}>
            <Text
              size="m"
              bold="normal"
              theme="gray"
              wordWrap="break-word"
              whiteSpace="nowrap"
              overflow="ellipsis"
              of="hide"
            >
              ㆍ
            </Text>
            <Text
              size="m"
              bold="normal"
              theme="gray"
              wordWrap="break-word"
              whiteSpace="nowrap"
              overflow="ellipsis"
              of="hide"
            >
              {dayjs(lastMessage.at).fromNow(true)}
            </Text>
          </div>
        )}
        {snoozeHandler(Snooze).active && (
          <AlarmSvg className={cx(utils.pl_6)} type={'off'} width={16} />
        )}
      </div>
      <div
        className={cx(
          utils.pr_28_75,
          utils.d_flexColumn,
          utils.h_max_40,
          utils.of_hide
        )}
      >
        <Text
          size="m"
          bold="normal"
          theme={active ? 'theme' : 'gray'}
          wordWrap="break-word"
          whiteSpace="nowrap"
          of="hide"
        >
          {lastMessage.type !== null && lastMessage.content === ''
            ? `You sent a ${lastMessage.type === 'image' ? 'photo' : 'gif'}`
            : lastMessage.content}
        </Text>
      </div>
    </div>
  );
}
