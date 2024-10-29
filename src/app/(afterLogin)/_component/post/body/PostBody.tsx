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
import NoQuote from '@/app/(afterLogin)/_component/post/_quote/NoQuote';

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
              <BadgeButton verified={post.User.verified} unClickable />
            </span>
            <span>@{post.User.id}</span>
            <span>·</span>
          </Link>
          <PostDate mode={mode} date={post.createat} />
        </div>
      )}
      {post.Parent && !['single', 'comment', 'compose'].includes(mode) && (
        <PostReplyInfo id={post.Parent.User.id} />
      )}
      <PostContent
        mode={mode}
        postid={post.postid}
        userid={post.User.id}
        content={post.content}
      />
      {!noImage && (
        <PostImages
          mode={mode}
          userid={post.User.id}
          postid={post.postid}
          images={post.images}
        />
      )}
      {post.quote &&
        (post.Original ? (
          <PostQuote
            mode={
              post.images.length === 0 || mode === 'single' ? 'long' : 'short'
            }
            post={post.Original}
            noImage={isPhoto}
          />
        ) : (
          <NoQuote />
        ))}
      {mode === 'single' && (
        <>
          <div className={styles.postDateView}>
            <PostDate mode={mode} date={post.createat} isFull={true} />
            <span style={{ margin: '0 5px' }}>·</span>
            <PostView count={post._count.Views} />
          </div>
          {session?.user?.email === post.User.id && (
            <div className={styles.engagement}>
              <Link href={`${post.postid}/quotes`}>
                <ViewSvg width={18.75} />
                <span>View post engagements</span>
              </Link>
            </div>
          )}
        </>
      )}
      {!noReact && (
        <ActionButtons
          mode={mode}
          post={post}
          width={mode === 'single' ? 22.5 : 18.75}
        />
      )}
    </div>
  );
}
