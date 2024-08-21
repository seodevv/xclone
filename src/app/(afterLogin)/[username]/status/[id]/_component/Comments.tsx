'use client';

import Post from '@/app/(afterLogin)/_component/post/Post';
import { useCommentsInfiniteQuery } from '../_hooks/useCommentsQuery';
import DisConnection from '@/app/(afterLogin)/_component/error/DisConnection';
import { Fragment, MouseEventHandler } from 'react';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';

interface Props {
  params: { username: string; id: string };
}

export default function Comments({ params }: Props) {
  const {
    data: comments,
    isLoading,
    isError,
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
                <Post mode="comment" key={p.postId} post={p} />
              ))}
            </Fragment>
          );
        })}
        {isError && <DisConnection />}
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
