'use client';

import style from './post.module.css';
import 'dayjs/locale/ko';
import { useSession } from 'next-auth/react';
import cx from 'classnames';
import { AdvancedPost } from '@/model/Post';
import PostArticle from '@/app/(afterLogin)/_component/post/PostArticle';
import PostRepostInfo from './header/PostRepostInfo';
import PostHeader from './header/PostHeader';
import PostBody from './body/PostBody';

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
  const isRepost = !!post.Original;

  return (
    <PostArticle post={data} isSingle={isSingle}>
      {isRepost && <PostRepostInfo session={session} userId={post.User.id} />}
      <div className={cx(style.postWrapper, isSingle && style.single)}>
        <PostHeader post={data} isSingle={isSingle} />
        <PostBody post={data} isSingle={isSingle} noImage={noImage} />
      </div>
    </PostArticle>
  );
}
