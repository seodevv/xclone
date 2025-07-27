'use client';

import FollowRecommend from '@/app/(afterLogin)/_component/follow_recommends/FollowRecommend';
import { useUserFollowListQuery } from '../../_hooks/useUserFollowListQuery';
import UserFollowNoContent from './UserFollowNoContent';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import DisConnection from '@/app/(afterLogin)/_component/error/DisConnection';
import PageLoading from '@/app/(afterLogin)/_component/loading/PageLoading';

interface Props {
  username: string;
  type: 'verified_followers' | 'follow' | 'following';
}

export default function UserFollowContent({ username, type }: Props) {
  const {
    data: users,
    isEmpty,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    error,
    isError,
    fetchNextPage,
    refetch,
  } = useUserFollowListQuery({ username, type });

  if (isEmpty) {
    return <UserFollowNoContent type={type} />;
  }

  if (users) {
    return (
      <div>
        {users.pages.map((page) =>
          page.data?.map((u) => <FollowRecommend key={u.id} user={u} isDesc />)
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
    throw error;
  }

  return <DisConnection onClick={() => refetch()} />;
}
