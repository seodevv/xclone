import utils from '@/app/utility.module.css';
import { AdvancedRooms } from '@/model/Room';
import cx from 'classnames';

interface Props {
  sessionId: string;
  sent: AdvancedRooms['sent'];
}

export default function MessagesRoomNotification({ sessionId, sent }: Props) {
  const noti = sent.find((v) => v.id !== sessionId);

  if (typeof noti === 'undefined' || noti.count === 0) {
    return null;
  }

  return (
    <div
      className={cx(
        utils.ml_16,
        utils.relative,
        utils.d_flexColumn,
        utils.flexShrink_0
      )}
    >
      <div
        className={cx(
          utils.mt_7,
          utils.absolute,
          utils.w_10,
          utils.h_10,
          utils.bg_primary,
          utils.bd_1_solid_black,
          utils.br_9999
        )}
        style={{ top: '-1px', right: '1px' }}
      ></div>
    </div>
  );
}
