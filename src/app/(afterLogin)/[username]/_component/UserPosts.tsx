'use client';

import style from '@/app/(afterLogin)/[username]/_style/userPosts.module.css';
import { Session } from 'next-auth';
import { useUserQuery } from '../_hooks/useUserQuery';
import { useUserPostsQuery } from '../_hooks/useUserPostsQuery';
import Post from '@/app/(afterLogin)/_component/post/Post';

interface Props {
  session: Session | null;
  username: string;
  filter?: 'all' | 'reply' | 'media' | 'like';
}

export default function UserPosts({
  session,
  username,
  filter = 'all',
}: Props) {
  const { data: user } = useUserQuery(username);
  const { data: posts } = useUserPostsQuery({ username, filter });

  if (!user) return null;

  return (
    <>
      <div className={style.userPosts}>
        {posts?.data.map((post) => (
          <Post key={post.postId} post={post} />
        ))}
      </div>
    </>
  );
}
