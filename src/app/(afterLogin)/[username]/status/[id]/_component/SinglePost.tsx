'use client';

import style from '../_style/singlePost.module.css';
import { useSinglePostQuery } from '../_hooks/useSinglePostQuery';
import { Session } from 'next-auth';
import CommentForm from './CommentForm';
import Comments from './Comments';
import Post from '@/app/(afterLogin)/_component/post/Post';

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
        <CommentForm
          session={session}
          userId={post.data.User.id}
          postId={post.data.postId}
        />
      )}
      <Comments params={params} />
    </div>
  );
}
