'use client';

import styles from './postBody.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import Link from 'next/link';
import PostReplyInfo from '@/app/(afterLogin)/_component/post/body/PostReplyInfo';
import PostContent from '@/app/(afterLogin)/_component/post/body/PostContent';
import PostImages from '@/app/(afterLogin)/_component/post/body/PostImages';
import PostDate from '@/app/(afterLogin)/_component/post/body/PostDate';
import PostView from '@/app/(afterLogin)/_component/post/body/PostView';
import ViewSvg from '@/app/_svg/actionbuttons/ViewSvg';
import ActionButtons from '@/app/(afterLogin)/_component/post/body/ActionButtons';
import { AdvancedPost } from '@/model/Post';
import { useSession } from 'next-auth/react';
import BadgeButton from '@/app/(afterLogin)/_component/buttons/BadgeButton';
import { Mode } from '@/app/(afterLogin)/_component/post/Post';
import { usePathname } from 'next/navigation';
import PostQuote from '@/app/(afterLogin)/_component/post/_quote/PostQuote';
import OptionButton from '@/app/(afterLogin)/_component/buttons/OptionButton';

interface Props {
  mode?: Mode;
  post: AdvancedPost;
  noImage?: boolean;
  noReact?: boolean;
}

export default function PostBody({
  mode = 'post',
  post,
  noImage,
  noReact,
}: Props) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isPhoto = /\/.*\/status\/[0-9]+\/photo\/[0-9]+/.test(pathname);

  return (
    <div className={styles.postBody}>
      {mode !== 'single' && (
        <div className={styles.postMeta}>
          <Link
            className={cx(
              styles.postUserInfo,
              mode === 'compose' && utils.pointer_event_none
            )}
            href={`/${post.User.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span>
              {post.User.nickname}
              <BadgeButton badge={post.User.verified} unClickable />
            </span>
            <span>@{post.User.id}</span>
            <span>·</span>
          </Link>
          <PostDate mode={mode} date={post.createAt} />
        </div>
      )}
      {post.Parent && !['single', 'comment', 'compose'].includes(mode) && (
        <PostReplyInfo id={post.Parent.User.id} />
      )}
      <PostContent
        mode={mode}
        postId={post.postId}
        userId={post.User.id}
        content={post.content}
      />
      {!noImage && (
        <PostImages
          mode={mode}
          userId={post.User.id}
          postId={post.postId}
          images={post.images}
        />
      )}
      {post.Original && post.quote && (
        <PostQuote
          mode={
            post.images.length === 0 || mode === 'single' ? 'long' : 'short'
          }
          post={post.Original}
          noImage={isPhoto}
        />
      )}
      {mode === 'single' && (
        <>
          <div className={styles.postDateView}>
            <PostDate mode={mode} date={post.createAt} isFull={true} />
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
      {!noReact && <ActionButtons mode={mode} post={post} width={22.5} />}
    </div>
  );
}
