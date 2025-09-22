'use client';

import Post from '@/app/(afterLogin)/_component/post/Post';
import { useCommentsInfiniteQuery } from '../_hooks/useCommentsQuery';
import DisConnection from '@/app/(afterLogin)/_component/error/DisConnection';
import { Fragment, MouseEventHandler } from 'react';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import PageLoading from '@/app/(afterLogin)/_component/loading/PageLoading';

interface Props {
  params: { username: string; id: string };
}

export default function Comments({ params }: Props) {
  const {
    data: comments,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
    fetchNextPage,
    refetch,
  } = useCommentsInfiniteQuery(params);

  const onClickRetry: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    refetch();
  };

  if (comments) {
    return (
      <div>
        {comments.pages.map((page, i) => {
          return (
            <Fragment key={i}>
              {page.data.map((p) => (
                <Post mode="comment" key={p.postid} post={p} />
              ))}
            </Fragment>
          );
        })}
        <PageLoading
          type="next"
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isError={isError}
          fetchNextPage={fetchNextPage}
          refetch={refetch}
        />
        {/* {isError && <DisConnection />} */}
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <DisConnection onClick={onClickRetry} />;
  }

  return null;
}
