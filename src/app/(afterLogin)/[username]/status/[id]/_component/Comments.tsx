'use client';

import Post from '@/app/(afterLogin)/_component/post/Post';
import { useCommentsInfiniteQuery } from '../_hooks/useCommentsQuery';
import DisConnection from '@/app/(afterLogin)/_component/error/DisConnection';
import { Fragment, MouseEventHandler } from 'react';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';

interface Props {
  id: string;
}

export default function Comments({ id }: Props) {
  const {
    data: comments,
    isLoading,
    isError,
    refetch,
  } = useCommentsInfiniteQuery(id);

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
                <Post key={p.postId} post={p} />
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

  return <DisConnection onClick={onClickRetry} />;
}
