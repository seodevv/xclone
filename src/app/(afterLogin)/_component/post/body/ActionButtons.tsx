'use client';

import style from './postBody.module.css';
import { MouseEventHandler } from 'react';
import { useSession } from 'next-auth/react';
import cx from 'classnames';
import { AdvancedPost } from '@/model/Post';
import RepostSvg from '@/app/_svg/actionbuttons/RepostSvg';
import CommentSvg from '@/app/_svg/actionbuttons/CommentSvg';
import BookmarkSvg from '@/app/_svg/actionbuttons/BookmarkSvg';
import ViewSvg from '@/app/_svg/actionbuttons/ViewSvg';
import ShareSvg from '@/app/_svg/actionbuttons/ShareSvg';
import ReactionButton from '@/app/(afterLogin)/_component/buttons/ReactionButton';

type Props = {
  post: AdvancedPost;
  isSingle?: boolean;
  isPhoto?: boolean;
  white?: boolean;
  width?: number;
};

export default function ActionButtons({
  post,
  isSingle = false,
  isPhoto = false,
  white = false,
  width = 18.75,
}: Props) {
  const bookmarked = false;

  const onClickBookmark: MouseEventHandler<HTMLButtonElement> = (e) => {};
  const onClickShare: MouseEventHandler<HTMLButtonElement> = (e) => {};

  return (
    <div className={cx(style.actionButtons, isSingle && style.single)}>
      <ReactionButton type="Comments" post={post} width={width} white={white} />
      <ReactionButton type="Reposts" post={post} width={width} white={white} />
      <ReactionButton type="Hearts" post={post} width={width} white={white} />
      {isSingle && (
        <div className={style.actionButton}>
          <button
            className={cx(style.primaryButton, bookmarked && style.primary)}
            onClick={onClickBookmark}
          >
            <BookmarkSvg active={bookmarked} width={width} white={white} />
          </button>
          <div className={style.reactionCount}>{post._count.Hearts || ''}</div>
        </div>
      )}
      {!isSingle && (
        <ReactionButton type="Views" post={post} width={width} white={white} />
      )}
      <div className={style.doubleButton}>
        {!isSingle && !isPhoto && (
          <button
            className={cx(style.primaryButton, bookmarked && style.primary)}
            onClick={onClickBookmark}
          >
            <BookmarkSvg active={bookmarked} width={width} white={white} />
          </button>
        )}
        <button className={style.primaryButton} onClick={onClickShare}>
          <ShareSvg width={width} white={white} />
        </button>
      </div>
    </div>
  );
}
