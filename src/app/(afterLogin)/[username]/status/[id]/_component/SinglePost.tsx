'use client';

import style from '../_style/singlePost.module.css';
import { useSinglePostQuery } from '../_hooks/useSinglePostQuery';
import { Session } from 'next-auth';
import Comments from './Comments';
import Post from '@/app/(afterLogin)/_component/post/Post';
import PostForm from '@/app/(afterLogin)/_component/post/form/PostForm';

interface Props {
  params: { username: string; id: string };
  session: Session | null;
}

export default function SinglePost({ params, session }: Props) {
  const { data: post } = useSinglePostQuery(params);

  return (
    <div className={style.main}>
      <Post post={post.data} isSingle={true} />
      {session && (
        <PostForm
          session={session}
          parent={{ postId: post.data.postId, userId: post.data.User.id }}
        />
      )}
      <Comments params={params} />
    </div>
  );
}
