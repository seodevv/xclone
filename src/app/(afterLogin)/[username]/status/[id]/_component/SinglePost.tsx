'use client';

import style from '../_style/singlePost.module.css';
import { useSinglePostQuery } from '../_hooks/useSinglePostQuery';
import { Session } from 'next-auth';
import CommentForm from './CommentForm';
import Comments from './Comments';
import Post from '@/app/(afterLogin)/_component/post/Post';

interface Props {
  id: string;
  session: Session | null;
}

export default function SinglePost({ session, id }: Props) {
  const { data: post } = useSinglePostQuery(id);

  return (
    <div className={style.main}>
      <Post post={post.data} isSingle={true} />
      {session && <CommentForm id={post.data.User.id} />}
      <Comments id={id} />
    </div>
  );
}
