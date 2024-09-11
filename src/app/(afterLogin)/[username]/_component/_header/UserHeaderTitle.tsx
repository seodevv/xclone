'use client';

import style from './userHeader.module.css';
import { useSelectedLayoutSegments } from 'next/navigation';
import { useUserQuery } from '../../_hooks/useUserQuery';
import { useUserPostsCountQuery } from '../../_hooks/useUserPostsCountQuery';
import { useSession } from 'next-auth/react';

interface Props {
  username: string;
}

export default function UserHeaderTitle({ username }: Props) {
  const { data: session } = useSession();
  const [a, b, c] = useSelectedLayoutSegments();

  const { data: user } = useUserQuery(username);
  const { data: count } = useUserPostsCountQuery({
    username,
    filter: a === 'media' ? 'media' : a === 'likes' ? 'likes' : 'all',
  });

  let title = 'Profile';
  let sub = '';
  if (user) {
    title = user.data.nickname;
    switch (a) {
      // /username
      // /username/with_replies
      case undefined:
      case 'with_replies':
        sub = `${count?.data || 0} posts`;
        break;
      // /username/media
      case 'media':
        sub = `${count?.data || 0} photos & videos`;
        break;
      // /username/likes
      case 'likes':
        sub = `${count?.data || 0} Like`;
        break;
      // /username/verified_followers
      // /username/followers
      // /username/following
      case 'verified_followers':
      case 'followers':
      case 'following':
        sub = `@${user.data.id}`;
        break;
      // /username/status/id
      case 'status':
        title = 'Post';
        // /username/status/id/quotes
        // /username/status/id/retweets
        // /username/status/id/likes
        if (['quotes', 'retweets', 'likes'].includes(c)) {
          title = 'Post engagements';
        }
        break;
      // /username/lists/memberships
      case 'lists':
        title = `Lists ${
          session?.user?.email === username ? 'you' : 'they'
        }'re on`;
        sub = `@${username}`;
        break;
    }
  }

  if (a === 'lists' && b === undefined) {
    return null;
  }

  return (
    <div className={style.headerTitles}>
      <h3 className={style.headerTitle}>{title}</h3>
      {sub && <div className={style.headerSub}>{sub}</div>}
    </div>
  );
}
