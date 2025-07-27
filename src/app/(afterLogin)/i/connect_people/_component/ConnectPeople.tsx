'use client';

import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import FollowRecommend from '@/app/(afterLogin)/_component/follow_recommends/FollowRecommend';
import PageLoading from '@/app/(afterLogin)/_component/loading/PageLoading';
import { useFollowRecommendsQuery } from '@/app/(afterLogin)/_hooks/useFollowRecommendsQuery';
import Text from '@/app/_component/_text/Text';
import DisConnection from '@/app/(afterLogin)/_component/error/DisConnection';

interface Props {
  is_creator_only?: string;
}

export default function ConnectPeople({ is_creator_only }: Props) {
  const {
    data: people,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
    fetchNextPage,
    refetch,
  } = useFollowRecommendsQuery(!!is_creator_only);

  if (people) {
    return (
      <div>
        {!is_creator_only && (
          <Text
            text="Suggested for you"
            size="xl"
            bold="bold"
            style={{ padding: 12 }}
          />
        )}
        {people.pages.map((page) =>
          page.data.map((u) => (
            <FollowRecommend
              key={u.id}
              user={u}
              isDesc
              isSubscribe={!!is_creator_only}
            />
          ))
        )}
        <PageLoading
          type="next"
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isError={isError}
          fetchNextPage={fetchNextPage}
          refetch={refetch}
        />
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <DisConnection onClick={() => refetch()} />;
  }

  return <section></section>;
}
