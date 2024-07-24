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
import OptionSvg from '@/app/_svg/post/OptionSvg';
import ViewSvg from '@/app/_svg/actionbuttons/ViewSvg';
import OtherProfile from '../profile/OtherProfile';
import PostReplyInfo from './PostReplyInfo';

interface Props {
  post: AdvancedPost;
  isSingle?: boolean;
  noImage?: boolean;
  isComment?: boolean;
}
export default function Post({
  post,
  isSingle = false,
  noImage = false,
  isComment = false,
}: Props) {
  const { data: session } = useSession();

  return (
    <PostArticle post={post} className={style.post} isSingle={isSingle}>
      <div className={cx(style.postWrapper, isSingle && style.isSinglePost)}>
        <div className={style.postUserSection}>
          <OtherProfile user={post.User} isSingle />
          {isSingle && (
            <>
              <div className={style.postUserInfo}>
                <Link
                  href={`/${post.User.id}`}
                  className={style.singlePostMeta}
                >
                  <span className={style.postUserName}>
                    {post.User.nickname}
                  </span>
                  <span className={style.postUserId}>@{post.User.id}</span>
                </Link>
              </div>
              <div className={style.postUserOption}>
                <button>
                  <OptionSvg />
                </button>
              </div>
            </>
          )}
        </div>
        <div className={style.postBody}>
          {!isSingle && (
            <div className={style.postMeta}>
              <Link href={`/${post.User.id}`}>
                <span className={style.postUserName}>{post.User.nickname}</span>
                <span className={style.postUserId}>@{post.User.id}</span>
                <span className={style.postUserDot}>·</span>
              </Link>
              <PostDate className={style.postDate} date={post.createAt} />
            </div>
          )}
          {post.Parent && !isComment && (
            <PostReplyInfo id={post.Parent.User.id} />
          )}
          <PostContent className={style.postContent} content={post.content} />
          {!noImage && (
            <div>
              <PostImages
                userId={post.User.id}
                postId={post.postId}
                images={post.images}
                isSingle={isSingle}
              />
            </div>
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
          <ActionButtons post={post} isSingle={isSingle} />
        </div>
      </div>
    </PostArticle>
  );
}
