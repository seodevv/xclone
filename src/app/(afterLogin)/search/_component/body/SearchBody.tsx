'use client';

import styles from './searchBody.module.css';
import { usePostSearchQuery } from '../../_hook/usePostSearchQuery';
import Post from '../../../_component/post/Post';
import SearchNoResult from '../SearchNoResult';
import LoadingSpinner from '../../../_component/loading/LoadingSpinner';
import DisConnection from '../../../_component/error/DisConnection';
import { useUserSearchQuery } from '../../_hook/useUserSearchQuery';
import { useState } from 'react';
import SearchPosts from './SearchPosts';
import SearchUsers from './SearchUsers';

interface Props {
  searchParams: { q?: string; f?: string; pf?: string; lf?: string };
}

export default function SearchBody({ searchParams }: Props) {
  const isUser =
    typeof searchParams.f === 'undefined' || searchParams.f === 'user';
  const isPost = searchParams.f !== 'user';
  const {
    data: searchPosts,
    isLoading: postIsLoading,
    isFetching: postIsFetching,
    isFetchingNextPage,
    isError,
  } = usePostSearchQuery({ searchParams });
  const {
    data: searchUsers,
    isLoading: userIsLoading,
    isFetching: userIsFetching,
  } = useUserSearchQuery({
    searchParams,
    enabled: isUser,
  });

  if (
    (isPost && (postIsLoading || postIsFetching)) ||
    (isUser && (userIsLoading || userIsFetching))
  ) {
    return <LoadingSpinner />;
  }

  if (
    searchPosts?.pages[0].data.length === 0 &&
    searchUsers?.pages[0].data.length === 0
  ) {
    return <SearchNoResult q={searchParams.q} />;
  }

  return (
    <section className={styles.body}>
      {isUser &&
        searchUsers?.pages.map((page, i) => (
          <SearchUsers key={i} users={page.data} />
        ))}
      {isPost &&
        searchPosts?.pages.map((page) => <SearchPosts posts={page.data} />)}
      {isError && <DisConnection />}
      {isFetchingNextPage && <LoadingSpinner />}
    </section>
  );
}
