'use client';

import DisConnection from '@/app/(afterLogin)/_component/error/DisConnection';
import PageLoading from '@/app/(afterLogin)/_component/loading/PageLoading';
import NoPost from '@/app/(afterLogin)/_component/post/NoPost';
import Post from '@/app/(afterLogin)/_component/post/Post';
import useGetSingleListsPostsQuery from '@/app/(afterLogin)/i/lists/[listId]/_hooks/useGetSingleListsPostsQuery';

interface Props {
  listId: string;
}

export default function SingleListsPosts({ listId }: Props) {
  const {
    data: posts,
    hasNextPage,
    isFetchingNextPage,
    isError,
    fetchNextPage,
    refetch,
  } = useGetSingleListsPostsQuery(listId);

  if (posts) {
    if (posts.pages[0].data?.length === 0) {
      return (
        <NoPost
          title="Waiting for posts"
          message="Posts from people in this List will show up here.
"
        />
      );
    }

    return (
      <div>
        {posts.pages.map((page) =>
          page.data?.map((p) => <Post key={p.postId} post={p} />)
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

  if (isError) {
    return <DisConnection onClick={() => refetch()} />;
  }

  return null;
}
