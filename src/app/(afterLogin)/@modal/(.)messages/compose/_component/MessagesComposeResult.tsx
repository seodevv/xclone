'use client';

import { MessagesComposeContext } from '@/app/(afterLogin)/@modal/(.)messages/compose/_provider/MessagesComposeProvider';
import UserRecommend from '@/app/(afterLogin)/_component/follow_recommends/UserRecommend';
import PageLoading from '@/app/(afterLogin)/_component/loading/PageLoading';
import { getUserSearch } from '@/app/(afterLogin)/_lib/getUserSearch';
import Progressbar from '@/app/_component/_util/Progressbar';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useContext } from 'react';

interface Props {
  sessionId: string;
}

export default function MessagesComposeResult({ sessionId }: Props) {
  const {
    search,
    setSearch,
    enabled,
    changeType,
    getUsers,
    addUsers,
    removeUsers,
  } = useContext(MessagesComposeContext);
  const usersIds = getUsers().map((u) => u.id);
  const {
    data: users,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isError,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['users', 'list', 'search', { q: search }],
    queryFn: getUserSearch,
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled,
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <Progressbar active={isFetching} />
      {users?.pages.map((page) =>
        page.data.map((user) => {
          const exist = usersIds.includes(user.id);

          if (user.id === sessionId) return null;
          return (
            <div key={user.id}>
              <UserRecommend
                user={user}
                isCheck={exist}
                onClick={() => {
                  changeType('single');
                  if (exist) {
                    removeUsers(user.id);
                  } else {
                    addUsers(user);
                  }
                  setSearch('');
                }}
              />
            </div>
          );
        })
      )}
      {users && hasNextPage && (
        <PageLoading
          type="next"
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isError={isError}
          fetchNextPage={fetchNextPage}
          refetch={refetch}
        />
      )}
    </div>
  );
}
