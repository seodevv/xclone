'use client';

import style from './post.module.css';
import 'dayjs/locale/ko';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import cx from 'classnames';
import { AdvancedPost } from '@/model/Post';
import PostArticle from '@/app/(afterLogin)/_component/post/PostArticle';
import PostDate from '@/app/(afterLogin)/_component/post/PostDate';
import PostView from '@/app/(afterLogin)/_component/post/PostView';
import PostContent from '@/app/(afterLogin)/_component/post/PostContent';
import PostImages from '@/app/(afterLogin)/_component/post/PostImages';
import ActionButtons from '@/app/(afterLogin)/_component/post/ActionButtons';
import ViewSvg from '@/app/_svg/actionbuttons/ViewSvg';
import PostReplyInfo from './PostReplyInfo';
import PostRepostInfo from './PostRepostInfo';
import PostHeader from './PostHeader';

interface Props {
  post: AdvancedPost;
  isSingle?: boolean;
  noImage?: boolean;
  isComment?: boolean;
  isRepost?: boolean;
}
export default function Post({
  post,
  isSingle = false,
  noImage = false,
  isComment = false,
  isRepost = false,
}: Props) {
  const { data: session } = useSession();

  return (
    <PostArticle post={post} className={style.post} isSingle={isSingle}>
      {isRepost && <PostRepostInfo session={session} userId={post.User.id} />}
      <div className={cx(style.postWrapper, isSingle && style.isSinglePost)}>
        <PostHeader post={post} isSingle={isSingle} />
        <div className={style.postBody}>
          {!isSingle && (
            <div className={style.postMeta}>
              <Link
                className={style.postUserInfo}
                href={`/${post.User.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <span>{post.User.nickname}</span>
                <span>@{post.User.id}</span>
                <span>·</span>
              </Link>
              <PostDate className={style.postDate} date={post.createAt} />
            </div>
          )}
          {post.Parent && !isComment && !isSingle && (
            <PostReplyInfo id={post.Parent.User.id} />
          )}
          <PostContent
            className={style.postContent}
            postId={post.postId}
            userId={post.User.id}
            content={post.content}
            isSingle={isSingle}
          />
          {!noImage && (
            <PostImages
              userId={post.User.id}
              postId={post.postId}
              images={post.images}
              isSingle={isSingle}
            />
          )}
          {isSingle && (
            <>
              <div className={style.postDateView}>
                <PostDate
                  className={style.postDate}
                  date={post.createAt}
                  isFull={true}
                />
                <span style={{ margin: '0 5px' }}>·</span>
                <PostView className={style.postView} />
              </div>
              {session?.user?.email === post.User.id && (
                <div className={style.engagement}>
                  <Link href={`${post.postId}/quotes`}>
                    <ViewSvg width={18.75} />
                    <span>View post engagements</span>
                  </Link>
                </div>
              )}
            </>
          )}
          <ActionButtons post={post} isSingle={isSingle} width={22.5} />
        </div>
      </div>
    </PostArticle>
  );
}
