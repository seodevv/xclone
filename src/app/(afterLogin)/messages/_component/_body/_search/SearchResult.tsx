'use client';

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import Message from '@/app/(afterLogin)/messages/_component/_body/_search/_messages/Message';
import People from '@/app/(afterLogin)/messages/_component/_body/_search/_people/People';
import { MessagesSearchContext } from '@/app/(afterLogin)/messages/_component/_body/_search/_provider/MessagesSearchProvider';
import More from '@/app/(afterLogin)/messages/_component/_body/_search/More';
import NoResult from '@/app/(afterLogin)/messages/_component/_body/_search/NoResult';
import SearchResultTitle from '@/app/(afterLogin)/messages/_component/_body/_search/SearchResultTitle';
import useGetMessagesSearch from '@/app/(afterLogin)/messages/_hooks/useGetMessagesSearch';
import useGetRooms from '@/app/(afterLogin)/messages/_hooks/useGetRooms';
import { useContext } from 'react';
import Text from '@/app/_component/_text/Text';

interface Props {
  sessionid: string;
}

export default function SearchResult({ sessionid }: Props) {
  const { tab, input, enabled, set } = useContext(MessagesSearchContext);
  const { data: people_data, isFetching: people_isFetching } =
    useGetRooms(sessionid);
  const { data: message_data, isFetching: message_isFetching } =
    useGetMessagesSearch({
      query: input,
      enabled,
    });

  const rooms = people_data?.data.filter((room) => {
    const target = room.senderid === sessionid ? room.Receiver : room.Sender;
    return target.id.includes(input) || target.nickname.includes(input);
  });
  const messages = message_data?.pages.map((page) => page.data).flat();

  if (tab === 'people') {
    if (people_isFetching) {
      return <LoadingSpinner />;
    }

    if (rooms?.length === 0) {
      return <NoResult />;
    }

    return rooms?.map((room) => (
      <People
        key={room.id}
        input={input}
        user={room.senderid === sessionid ? room.Receiver : room.Sender}
        roomid={room.id}
      />
    ));
  }

  if (tab === 'messages') {
    if (message_isFetching) {
      return <LoadingSpinner />;
    }

    return (
      <>
        {messages?.map((message) => (
          <Message key={message.id} input={input} message={message} />
        ))}
        <NoMoreResult />
      </>
    );
  }

  if (tab === 'groups') {
    return <NoResult />;
  }

  if (people_isFetching || message_isFetching) {
    return <LoadingSpinner />;
  }

  if (rooms?.length === 0 && messages?.length === 0) {
    return <NoResult />;
  }

  return (
    <>
      {typeof rooms !== 'undefined' && rooms.length !== 0 && (
        <>
          <SearchResultTitle type="people" />
          {rooms.map((room, i) => {
            if (i >= 5) return null;
            return (
              <People
                key={room.id}
                input={input}
                user={room.senderid === sessionid ? room.Receiver : room.Sender}
                roomid={room.id}
              />
            );
          })}
          {rooms.length > 5 && <More callback={() => set({ tab: 'people' })} />}
        </>
      )}
      {typeof messages !== 'undefined' && messages.length !== 0 && (
        <>
          <SearchResultTitle type="messages" />
          {messages.map((message, i) => {
            if (i >= 5) return null;
            return <Message key={message.id} input={input} message={message} />;
          })}
          {messages.length > 5 && (
            <More callback={() => set({ tab: 'messages' })} />
          )}
        </>
      )}
    </>
  );
}

function NoMoreResult() {
  const { set } = useContext(MessagesSearchContext);
  return (
    <div className={utils.mtb_32}>
      <Text theme="theme" size="s" bold="bold" align="center">
        No more results
      </Text>
      <Text
        className={cx(utils.hover_underline, utils.cursor_point)}
        theme="primary"
        size="s"
        bold="light"
        align="center"
        onClick={() => set({ focus: true, input: '' })}
      >
        Try a different search term
      </Text>
    </div>
  );
}
