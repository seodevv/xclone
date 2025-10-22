'use client';

import styles from '../_style/singlePost.module.css';
import { useSinglePostQuery } from '../_hooks/useSinglePostQuery';
import { Session } from 'next-auth';
import Comments from './Comments';
import Post from '@/app/(afterLogin)/_component/post/Post';
import PostForm from '@/app/(afterLogin)/_component/post/form/PostForm';
import { useEffect, useRef } from 'react';
import useViewMutation from '@/app/(afterLogin)/[username]/status/[id]/_hooks/useViewMutation';
import useComposeStore from '@/app/(afterLogin)/_store/ComposeStore';

interface Props {
  params: { username: string; id: string };
  session: Session | null;
}

export default function SinglePost({ params, session }: Props) {
  const { data: post } = useSinglePostQuery(params);
  const { setCompose, reset } = useComposeStore((state) => ({
    setCompose: state.set,
    reset: state.reset,
  }));
  const viewMutation = useViewMutation();
  const mountRef = useRef(false);

  useEffect(() => {
    if (mountRef.current) {
      viewMutation.mutate({
        userid: params.username,
        postid: ~~params.id,
      });
    }
    mountRef.current = true;
  }, []);

  useEffect(() => {
    setCompose({ type: 'comment', post: post.data });
    return () => {
      reset();
    };
  }, [post]);

  return (
    <div className={styles.main}>
      <Post mode="single" post={post.data} />
      {session && (
        <div className={styles.form}>
          <PostForm
            session={session}
            mode="comment"
            parent={{ postid: post.data.postid, userid: post.data.User.id }}
          />
        </div>
      )}
      <Comments params={params} />
    </div>
  );
}
