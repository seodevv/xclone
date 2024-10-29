'use client';

import style from '../_style/singlePost.module.css';
import { useSinglePostQuery } from '../_hooks/useSinglePostQuery';
import { Session } from 'next-auth';
import Comments from './Comments';
import Post from '@/app/(afterLogin)/_component/post/Post';
import PostForm from '@/app/(afterLogin)/_component/post/form/PostForm';
import { useEffect, useRef } from 'react';
import useViewMutation from '@/app/(afterLogin)/[username]/status/[id]/_hooks/useViewMutation';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  params: { username: string; id: string };
  session: Session | null;
}

export default function SinglePost({ params, session }: Props) {
  const { data: post } = useSinglePostQuery(params);
  const queryClient = useQueryClient();
  const viewMutation = useViewMutation({
    userid: params.username,
    postid: ~~params.id,
  });
  const mountRef = useRef(false);

  useEffect(() => {
    if (mountRef.current) {
      viewMutation.mutate({
        queryClient,
      });
    }
    mountRef.current = true;
  }, []);

  return (
    <div className={style.main}>
      <Post mode="single" post={post.data} />
      {session && (
        <PostForm
          session={session}
          mode="comment"
          parent={{ postid: post.data.postid, userid: post.data.User.id }}
        />
      )}
      <Comments params={params} />
    </div>
  );
}
