import utils from '@/app/utility.module.css';
import cx from 'classnames';
import RoomHydrationBoundary from '@/app/(afterLogin)/messages/[room]/_boundary/RoomHydrationBoundary';
import RoomReceiverHydrationBoundary from '@/app/(afterLogin)/messages/[room]/_boundary/RoomReceiverHydrationBoundary';
import authOptions from '@/app/_lib/authOptions';
import { getServerSession } from 'next-auth';
import RoomHeader from '@/app/(afterLogin)/messages/[room]/_component/_header/RoomHeader';
import InstantRoomControll from '@/app/(afterLogin)/messages/[room]/_component/InstantRoomControll';
import RoomNotificationUpdater from '@/app/(afterLogin)/messages/[room]/_component/RoomNotificationUpdater';

interface Props {
  children: React.ReactNode;
  params: { room: string };
}

export default async function RoomLayout({
  children,
  params: { room },
}: Props) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  return (
    <RoomHydrationBoundary sessionId={session.user.email} roomId={room}>
      <RoomReceiverHydrationBoundary
        sessionid={session.user.email}
        roomid={room}
      >
        <InstantRoomControll sessionId={session.user.email} roomid={room} />
        <RoomNotificationUpdater sessionid={session.user.email} roomid={room} />
        <section
          className={cx(
            utils.d_flexColumn,
            utils.flex_justiStart,
            utils.flexGrow_1
          )}
        >
          <div
            className={cx(
              utils.absolute,
              utils.t_r_b_l_0,
              utils.d_flexColumn,
              utils.of_y_auto
            )}
          >
            <RoomHeader sessionId={session.user.email} roomId={room} />
            {children}
          </div>
        </section>
      </RoomReceiverHydrationBoundary>
    </RoomHydrationBoundary>
  );
}
