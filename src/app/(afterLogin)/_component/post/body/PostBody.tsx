'use client';

import styles from './postBody.module.css';
import Link from 'next/link';
import PostReplyInfo from '@/app/(afterLogin)/_component/post/body/PostReplyInfo';
import PostContent from '@/app/(afterLogin)/_component/post/body/PostContent';
import PostImages from '@/app/(afterLogin)/_component/post/body/PostImages';
import PostDate from '@/app/(afterLogin)/_component/post/body/PostDate';
import PostView from '@/app/(afterLogin)/_component/post/body/PostView';
import ViewSvg from '@/app/_svg/actionbuttons/ViewSvg';
import ActionButtons from '@/app/(afterLogin)/_component/post/body/ActionButtons';
import { AdvancedPost } from '@/model/Post';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Props {
  post: AdvancedPost;
  isSingle?: boolean;
  noImage?: boolean;
}

export default function PostBody({
  post,
  isSingle = false,
  noImage = false,
}: Props) {
  const { data: session } = useSession();
  const paths = usePathname().split('/');
  const isComment = paths.at(2) === 'status';

  return (
    <div className={styles.postBody}>
      {!isSingle && (
        <div className={styles.postMeta}>
          <Link
            className={styles.postUserInfo}
            href={`/${post.User.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span>{post.User.nickname}</span>
            <span>@{post.User.id}</span>
            <span>·</span>
          </Link>
          <PostDate date={post.createAt} />
        </div>
      )}
      {post.Parent && !isComment && !isSingle && (
        <PostReplyInfo id={post.Parent.User.id} />
      )}
      <PostContent
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
          <div className={styles.postDateView}>
            <PostDate date={post.createAt} isFull={true} />
            <span style={{ margin: '0 5px' }}>·</span>
            <PostView count={post._count.Views} />
          </div>
          {session?.user?.email === post.User.id && (
            <div className={styles.engagement}>
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
  );
}
