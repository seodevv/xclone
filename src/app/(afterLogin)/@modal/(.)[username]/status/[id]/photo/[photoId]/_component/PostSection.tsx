'use client';

import styles from '../_style/photoModal.module.css';
import { useSinglePostQuery } from '@/app/(afterLogin)/[username]/status/[id]/_hooks/useSinglePostQuery';
import { useContext } from 'react';
import { FoldContext } from '../_provider/FoldProvider';
import Post from '@/app/(afterLogin)/_component/post/Post';
import { Session } from 'next-auth';
import Comments from '@/app/(afterLogin)/[username]/status/[id]/_component/Comments';
import PostForm from '@/app/(afterLogin)/_component/post/form/PostForm';

interface Props {
  session: Session | null;
  params: { username: string; id: string };
}

export default function PostSection({ session, params }: Props) {
  const { fold } = useContext(FoldContext);
  const { data: post } = useSinglePostQuery(params);

  if (fold) return null;

  return (
    <section className={styles.postSection}>
      <Post mode="single" post={post.data} noImage />
      {session && (
        <PostForm
          session={session}
          mode="comment"
          parent={{ postid: post.data.postid, userid: post.data.User.id }}
        />
      )}
      <Comments params={params} />
    </section>
  );
}
