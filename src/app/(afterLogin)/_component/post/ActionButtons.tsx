'use client';

import style from './post.module.css';
import { MouseEventHandler } from 'react';
import { useSession } from 'next-auth/react';
import cx from 'classnames';
import { AdvancedPost } from '@/model/Post';
import HeartSvg from '@/app/_svg/actionbuttons/HeartSvg';
import RepostSvg from '@/app/_svg/actionbuttons/RepostSvg';
import CommentSvg from '@/app/_svg/actionbuttons/CommentSvg';
import BookmarkSvg from '@/app/_svg/actionbuttons/BookmarkSvg';
import ViewSvg from '@/app/_svg/actionbuttons/ViewSvg';
import ShareSvg from '@/app/_svg/actionbuttons/ShareSvg';

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
  const { data: session } = useSession();

  const commented = post.Comments.some((u) => u.id === session?.user?.email);
  const reposted = post.Reposts.some((u) => u.id === session?.user?.email);
  const hearted = post.Hearts.some((u) => u.id === session?.user?.email);
  const bookmarked = false;

  const onClickComment: MouseEventHandler<HTMLButtonElement> = (e) => {};
  const onClickRepost: MouseEventHandler<HTMLButtonElement> = (e) => {};
  const onClickHeart: MouseEventHandler<HTMLButtonElement> = (e) => {};
  const onClickBookmark: MouseEventHandler<HTMLButtonElement> = (e) => {};
  const onClickShare: MouseEventHandler<HTMLButtonElement> = (e) => {};

  return (
    <div className={cx(style.actionButtons, isSingle && style.isSingleActions)}>
      <div className={style.actionButton}>
        <button
          className={cx(style.primaryButton, commented && style.primary)}
          onClick={onClickComment}
        >
          <CommentSvg width={width} white={white} />
        </button>
        <div className={cx(style.reactionCount, white && style.white)}>
          {post._count.Comments || ''}
        </div>
      </div>
      <div className={style.actionButton}>
        <button
          className={cx(style.secondaryButton, reposted && style.reposted)}
          onClick={onClickRepost}
        >
          <RepostSvg width={width} white={white} />
        </button>
        <div className={cx(style.reactionCount, white && style.white)}>
          {post._count.Reposts || ''}
        </div>
      </div>
      <div className={style.actionButton}>
        <button
          className={cx(style.tertiaryButton, hearted && style.hearted)}
          onClick={onClickHeart}
        >
          <HeartSvg active={hearted} width={width} white={white} />
        </button>
        <div className={style.reactionCount}>{post._count.Hearts || ''}</div>
      </div>
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
        <div className={style.actionButton}>
          <button className={style.primaryButton}>
            <ViewSvg width={width} white={white} />
          </button>
          <div className={cx(style.reactionCount, white && style.white)}>
            {1}
          </div>
        </div>
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
