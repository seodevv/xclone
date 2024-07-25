'use client';

import { useContext } from 'react';
import { TabContext } from './TabProvider';
import Post from '@/app/(afterLogin)/_component/post/Post';
import usePostRecommendsQuery from '../_hook/usePostRecommendsQuery';

export default function PostRecommends() {
  const { tab } = useContext(TabContext);

  if (tab === 'rec') {
    const { data: posts } = usePostRecommendsQuery('recommends');

    return posts.pages.map((page) =>
      page.data.map((post) => (
        <Post
          key={post.postId}
          post={post.Original ? post.Original : post}
          isRepost={!!post.Original}
        />
      ))
    );
  }

  if (tab === 'fol') {
    const { data: posts } = usePostRecommendsQuery('followings');

    return posts.pages.map((page) =>
      page.data.map((post) => (
        <Post
          key={post.postId}
          post={post.Original ? post.Original : post}
          isRepost={!!post.Original}
        />
      ))
    );
  }

  return null;
}
