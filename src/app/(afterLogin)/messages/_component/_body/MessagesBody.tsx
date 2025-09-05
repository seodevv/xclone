'use client';

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import NoMessages from '@/app/(afterLogin)/messages/_component/NoMessages';
import useGetRooms from '@/app/(afterLogin)/messages/_hooks/useGetRooms';
import MessagesRoom from '@/app/(afterLogin)/messages/_component/_body/MessagesRoom';
import MessagesSearchProvider from '@/app/(afterLogin)/messages/_component/_body/_search/_provider/MessagesSearchProvider';
import MessagesSearch from '@/app/(afterLogin)/messages/_component/_body/_search/MessagesSearch';
import Text from '@/app/_component/_text/Text';
import { AdvancedRooms } from '@/model/Room';

interface Props {
  sessionId: string;
}

export default function MessagesBody({ sessionId }: Props) {
  const { data: rooms } = useGetRooms(sessionId);

  if (typeof rooms !== 'undefined' && rooms.data.length !== 0) {
    const pinList = rooms.data.filter((room) => room.Pinned);
    const unPinList = rooms.data.filter((room) => !room.Pinned);

    const sortList = (list: AdvancedRooms[]) =>
      list.sort((a, b) => {
        if (a.status === 'temp') {
          return -1;
        }
        if (a.lastat && b.lastat) {
          return a.lastat > b.lastat ? -1 : 1;
        }
        return a.createat > b.createat ? -1 : 1;
      });

    return (
      <MessagesSearchProvider>
        <MessagesSearch sessionid={sessionId} />
        {pinList.length !== 0 && (
          <>
            <ConversationTitle type="pin" />
            {sortList(pinList).map((room) => (
              <MessagesRoom key={room.id} room={room} sessionId={sessionId} />
            ))}
          </>
        )}
        {
          <>
            {pinList.length !== 0 && <ConversationTitle type="all" />}
            {sortList(unPinList).map((room) => (
              <MessagesRoom key={room.id} room={room} sessionId={sessionId} />
            ))}
          </>
        }
      </MessagesSearchProvider>
    );
  }

  return (
    <div>
      <NoMessages />
    </div>
  );
}

function ConversationTitle({ type }: { type: 'pin' | 'all' }) {
  return (
    <div
      className={cx(
        utils.ptb_12,
        utils.pl_16,
        utils.d_flexRow,
        utils.flex_alignCenter,
        utils.flex_justiBetween
      )}
    >
      <Text theme="theme" size="xl" bold="boldest">
        {type === 'pin' ? 'Pinned conversations' : 'All conversations'}
      </Text>
    </div>
  );
}
