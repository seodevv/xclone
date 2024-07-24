'use client';

import { useQuery } from '@tanstack/react-query';
import { getPostRecommends } from '../_lib/getPostRecommends';
import { useContext } from 'react';
import { TabContext } from './TabProvider';
import { getPostFollowings } from '../_lib/getPostFollowings';
import Post from '@/app/(afterLogin)/_component/post/Post';

export default function PostRecommends() {
  const { tab } = useContext(TabContext);

  if (tab === 'rec') {
    const { data: posts } = useQuery({
      queryKey: ['posts', 'list', 'recommends'],
      queryFn: getPostRecommends,
    });

    if (posts) {
      return posts.data.map((post) => (
        <Post
          key={post.postId}
          post={post.Original ? post.Original : post}
          isRepost={!!post.Original}
        />
      ));
    }
  }

  if (tab === 'fol') {
    const { data: posts } = useQuery({
      queryKey: ['posts', 'list', 'followings'],
      queryFn: getPostFollowings,
    });

    if (posts) {
      return posts.data.map((post) => (
        <Post
          key={post.postId}
          post={post.Original ? post.Original : post}
          isRepost={!!post.Original}
        />
      ));
    }
  }

  return null;
}
