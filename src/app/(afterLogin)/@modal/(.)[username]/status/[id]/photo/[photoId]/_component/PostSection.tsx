'use client';

import styles from '../_style/photoModal.module.css';
import { useSinglePostQuery } from '@/app/(afterLogin)/[username]/status/[id]/_hooks/useSinglePostQuery';
import { useContext, useEffect } from 'react';
import { FoldContext } from '../_provider/FoldProvider';
import Post from '@/app/(afterLogin)/_component/post/Post';
import { Session } from 'next-auth';
import CommentForm from '@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm';
import Comments from '@/app/(afterLogin)/[username]/status/[id]/_component/Comments';

interface Props {
  session: Session | null;
  params: { username: string; id: string };
}

export default function PostSection({ session, params }: Props) {
  const { fold } = useContext(FoldContext);
  const { data: post } = useSinglePostQuery(params);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (fold) return null;

  return (
    <section className={styles.postSection}>
      <Post post={post.data} noImage isSingle />
      {session && (
        <CommentForm
          session={session}
          userId={post.data.User.id}
          postId={post.data.postId}
        />
      )}
      <Comments params={params} />
    </section>
  );
}
