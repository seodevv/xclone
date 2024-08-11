'use client';

import style from './userHeader.module.css';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useUserQuery } from '../../_hooks/useUserQuery';
import { useUserPostsCountQuery } from '../../_hooks/useUserPostsCountQuery';

interface Props {
  username: string;
}

export default function UserHeaderTitle({ username }: Props) {
  const segment = useSelectedLayoutSegment();
  const { data: user } = useUserQuery(username);
  const { data: count } = useUserPostsCountQuery({
    username,
    filter:
      segment === 'media' ? 'media' : segment === 'likes' ? 'likes' : 'all',
  });

  let title = 'Profile';
  let sub = '';
  if (user) {
    title = user.data.nickname;
    switch (segment) {
      case null:
      case 'with_replies':
        sub = `${count?.data || 0} posts`;
        break;
      case 'media':
        sub = `${count?.data || 0} photos & videos`;
        break;
      case 'likes':
        sub = `${count?.data || 0} Like`;
        break;
      case 'verified_followers':
      case 'followers':
      case 'following':
        sub = `@${user.data.id}`;
        break;
      case 'status':
        title = 'Post';
        break;
    }
  }

  return (
    <div className={style.headerTitles}>
      <h3 className={style.headerTitle}>{title}</h3>
      {sub && <div className={style.headerSub}>{sub}</div>}
    </div>
  );
}
