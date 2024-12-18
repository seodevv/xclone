'use client';

import styles from './post.module.css';
import cx from 'classnames';
import 'dayjs/locale/ko';
import { useSession } from 'next-auth/react';
import { AdvancedPost } from '@/model/Post';
import PostArticle from '@/app/(afterLogin)/_component/post/PostArticle';
import PostRepostInfo from './header/PostRepostInfo';
import PostHeader from './header/PostHeader';
import PostBody from './body/PostBody';
import { CSSProperties } from 'react';
import PostOptions from '@/app/(afterLogin)/_component/post/header/PostOptions';
import PostPinned from '@/app/(afterLogin)/_component/post/header/PostPinned';
import { usePathname } from 'next/navigation';

export type Mode = 'post' | 'single' | 'comment' | 'compose';
interface Props {
  className?: string;
  style?: CSSProperties;
  mode?: Mode;
  post: AdvancedPost;
  noImage?: boolean;
  noReact?: boolean;
  noEvent?: boolean;
  hasPinned?: boolean;
}
export default function Post({
  className,
  style,
  mode = 'post',
  post,
  noImage,
  noReact,
  noEvent,
  hasPinned,
}: Props) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const data = post.Original && !post.quote ? post.Original : post;
  const isRepost = !!post.Original && !post.quote;

  return (
    <PostArticle
      className={className}
      style={style}
      mode={mode}
      post={data}
      noEvent={noEvent}
    >
      {isRepost && <PostRepostInfo session={session} userid={post.User.id} />}
      {hasPinned && post.pinned && <PostPinned />}
      <div
        className={cx(styles.postWrapper, mode === 'single' && styles.single)}
      >
        <PostHeader mode={mode} post={data} />
        <PostBody mode={mode} post={data} noImage={noImage} noReact={noReact} />
      </div>
      <PostOptions mode={mode} post={data} />
    </PostArticle>
  );
}
