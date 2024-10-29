'use client';

import styles from './postTrends.module.css';
import DisConnection from '@/app/(afterLogin)/_component/error/DisConnection';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import Post from '@/app/(afterLogin)/_component/post/Post';
import { usePostTrendsQuery } from '@/app/(afterLogin)/_hooks/usePostTrendsQuery';
import Text from '@/app/_component/_text/Text';

export default function PostTrends() {
  const {
    data: posts,
    isLoading,
    isError,
    refetch,
  } = usePostTrendsQuery('all');

  if (posts) {
    return (
      <PostTrendsWrapper>
        <div>
          {posts.pages.map((page) =>
            page.data.map((p) => <Post key={p.postid} post={p} />)
          )}
        </div>
      </PostTrendsWrapper>
    );
  }

  if (isLoading) {
    return (
      <PostTrendsWrapper>
        <LoadingSpinner />
      </PostTrendsWrapper>
    );
  }

  if (isError) {
    return (
      <PostTrendsWrapper>
        <DisConnection onClick={() => refetch()} />
      </PostTrendsWrapper>
    );
  }

  return null;
}

function PostTrendsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles.title}>
        <Text text="Posts For You" size="xl" bold="bold" />
      </div>
      {children}
    </>
  );
}
