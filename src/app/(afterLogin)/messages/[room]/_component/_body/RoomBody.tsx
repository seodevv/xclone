import styles from './room.body.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import RoomMessage from '@/app/(afterLogin)/messages/[room]/_component/_body/_messages/RoomMessages';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/_lib/authOptions';
import RoomScrollWrapper from '@/app/(afterLogin)/messages/[room]/_component/_body/RoomScrollWrapper';
import RoomBottomFunction from '@/app/(afterLogin)/messages/[room]/_component/_body/RoomBottomFunction';
import RoomMessageSender from '@/app/(afterLogin)/messages/[room]/_component/_body/_sender/RoomMessageSender';
import RoomReceiverInfo from '@/app/(afterLogin)/messages/[room]/_component/_body/RoomReceiverInfo';

interface Props {
  roomId: string;
  receiverid: string;
}

export default async function RoomBody({ roomId, receiverid }: Props) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  return (
    <div className={styles.body}>
      <div className={styles.message}>
        <div className={cx(utils.d_flexColumn, utils.flexGrow_1)}>
          <RoomScrollWrapper>
            <div className={styles.pad}>
              <div className={cx(utils.relative)}>
                <RoomReceiverInfo
                  receiverid={receiverid}
                  sessionId={session.user.email}
                  roomId={roomId}
                />
                <RoomMessage sessionId={session.user.email} roomId={roomId} />
              </div>
              <RoomBottomFunction />
            </div>
          </RoomScrollWrapper>
        </div>
      </div>
      <RoomMessageSender roomId={roomId} />
    </div>
  );
}
