'use client';

import style from '@/app/(afterLogin)/[username]/_style/profile.module.css';
import { useUserQuery } from '../_hooks/useUserQuery';
import { useUserPostsCountQuery } from '../_hooks/useUserPostsCountQuery';
import { useSelectedLayoutSegment } from 'next/navigation';

interface Props {
  username: string;
}

export default function UserHeaderContent({ username }: Props) {
  const segment = useSelectedLayoutSegment();
  const { data: user } = useUserQuery(username);
  const { data: count } = useUserPostsCountQuery({
    username,
    filter: segment === 'media' ? 'media' : 'all',
  });

  if (!user) {
    return (
      <div className={style.headerInfo}>
        <h3 className={style.headerTitle}>Profile</h3>
      </div>
    );
  }

  if (!segment || segment === 'with_replies') {
    return (
      <div className={style.headerInfo}>
        <h3 className={style.headerTitle}>{user?.data.nickname}</h3>
        <div className={style.headerSub}>{count ? count.data : 0} posts</div>
      </div>
    );
  }

  if (segment === 'media') {
    return (
      <div className={style.headerInfo}>
        <h3 className={style.headerTitle}>{user?.data.nickname}</h3>
        <div className={style.headerSub}>
          {count ? count.data : 0} photos & videos
        </div>
      </div>
    );
  }

  if (segment === 'status') {
    return (
      <div className={style.headerInfo}>
        <h3 className={style.headerTitle}>Post</h3>
      </div>
    );
  }

  if (['verified_followers', 'followers', 'following'].includes(segment)) {
    return (
      <div className={style.headerInfo}>
        <h3 className={style.headerTitle}>{user?.data.nickname}</h3>
        <div className={style.headerSub}>@{user?.data.id}</div>
      </div>
    );
  }

  return null;
}
