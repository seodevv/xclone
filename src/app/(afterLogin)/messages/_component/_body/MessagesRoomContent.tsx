import cx from 'classnames';
import utils from '@/app/utility.module.css';
import Text from '@/app/_component/_text/Text';
import { AdvancedRooms } from '@/model/Room';

interface Props {
  sessionId: string;
  room: AdvancedRooms;
  active?: boolean;
}

export default function MessagesRoomContent({
  sessionId,
  room,
  active,
}: Props) {
  if (room.type === null && room.content === '') return null;
  return (
    <div className={cx(utils.pr_30, utils.h_max_40, utils.of_hide)}>
      <div>
        <Text
          className={utils.of_hide}
          text={
            room.content
              ? room.content
              : room.type === 'image'
              ? room.lastmessagesenderid === sessionId
                ? 'You sent a photo'
                : 'Sent a photo'
              : room.type === 'gif'
              ? room.lastmessagesenderid === sessionId
                ? 'You sent a gif'
                : 'Sent a gif'
              : ''
          }
          theme={active ? 'theme' : 'gray'}
          whiteSpace="nowrap"
          overflow="ellipsis"
        />
      </div>
    </div>
  );
}
