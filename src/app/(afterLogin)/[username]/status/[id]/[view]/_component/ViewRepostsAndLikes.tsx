'use client';

import usePostRepostsAndLikesQuery from '@/app/(afterLogin)/[username]/status/[id]/[view]/_hooks/usePostRepostsAndLikesQuery';
import FollowRecommend from '@/app/(afterLogin)/_component/follow_recommends/FollowRecommend';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import PageLoading from '@/app/(afterLogin)/_component/loading/PageLoading';
import NoPost from '@/app/(afterLogin)/_component/post/NoPost';
import { ERROR_STATUS } from '@/app/(afterLogin)/error';

interface Props {
  username: string;
  id: string;
  view: 'retweets' | 'likes';
}

export default function ViewRepostsAndLikes({ username, id, view }: Props) {
  const {
    data: users,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
    fetchNextPage,
    refetch,
  } = usePostRepostsAndLikesQuery({
    username,
    id,
    view,
  });

  if (users) {
    if (users.pages[0].data.length === 0) {
      return (
        <NoPost
          title={view === 'retweets' ? 'No Reposts yest' : 'No Likes yet'}
          message={
            view === 'retweets'
              ? 'Share someone else’s post on your timeline by reposting it. When you do, it’ll show up here.'
              : 'When someone taps the heart to Like this post, it’ll show up here.'
          }
        />
      );
    }

    return (
      <div>
        {users.pages.map((page) =>
          page.data.map((u) => <FollowRecommend key={u.id} user={u} isDesc />)
        )}
        <PageLoading
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
    throw new Error(ERROR_STATUS.fetchError);
  }

  return null;
}
