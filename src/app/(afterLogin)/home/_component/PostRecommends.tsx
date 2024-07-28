'use client';

import { useContext } from 'react';
import { TabContext } from './TabProvider';
import Post from '@/app/(afterLogin)/_component/post/Post';
import useHomePostQuery from '../_hook/useHomePostQuery';

export default function PostRecommends() {
  const { tab } = useContext(TabContext);

  if (tab === 'rec') {
    const { data: posts } = useHomePostQuery('recommends');

    return posts.pages.map((page) =>
      page.data.map((p) => <Post key={p.postId} post={p} />)
    );
  }

  if (tab === 'fol') {
    const { data: posts } = useHomePostQuery('followings');

    return posts.pages.map((page) =>
      page.data.map((p) => <Post key={p.postId} post={p} />)
    );
  }

  return null;
}
