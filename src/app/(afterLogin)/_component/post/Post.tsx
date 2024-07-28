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
}
export default function Post({
  post,
  isSingle = false,
  noImage = false,
}: Props) {
  const { data: session } = useSession();
  const data = post.Original ? post.Original : post;
  const isComment = !!post.Parent;
  const isRepost = !!post.Original;

  return (
    <PostArticle post={data} className={style.post} isSingle={isSingle}>
      {isRepost && <PostRepostInfo session={session} userId={data.User.id} />}
      <div className={cx(style.postWrapper, isSingle && style.isSinglePost)}>
        <PostHeader post={data} isSingle={isSingle} />
        <div className={style.postBody}>
          {!isSingle && (
            <div className={style.postMeta}>
              <Link
                className={style.postUserInfo}
                href={`/${post.User.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <span>{data.User.nickname}</span>
                <span>@{data.User.id}</span>
                <span>·</span>
              </Link>
              <PostDate className={style.postDate} date={data.createAt} />
            </div>
          )}
          {data.Parent && !isComment && !isSingle && (
            <PostReplyInfo id={data.Parent.User.id} />
          )}
          <PostContent
            className={style.postContent}
            postId={data.postId}
            userId={data.User.id}
            content={data.content}
            isSingle={isSingle}
          />
          {!noImage && (
            <PostImages
              userId={data.User.id}
              postId={data.postId}
              images={data.images}
              isSingle={isSingle}
            />
          )}
          {isSingle && (
            <>
              <div className={style.postDateView}>
                <PostDate
                  className={style.postDate}
                  date={data.createAt}
                  isFull={true}
                />
                <span style={{ margin: '0 5px' }}>·</span>
                <PostView className={style.postView} />
              </div>
              {session?.user?.email === data.User.id && (
                <div className={style.engagement}>
                  <Link href={`${data.postId}/quotes`}>
                    <ViewSvg width={18.75} />
                    <span>View post engagements</span>
                  </Link>
                </div>
              )}
            </>
          )}
          <ActionButtons post={data} isSingle={isSingle} width={22.5} />
        </div>
      </div>
    </PostArticle>
  );
}
