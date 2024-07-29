'use client';

import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { TabContext } from './TabProvider';
import Post from '@/app/(afterLogin)/_component/post/Post';
import useHomePostQuery from '../_hook/useHomePostQuery';
import LoadingSpinner from '../../_component/loading/LoadingSpinner';

export default function PostRecommends() {
  const { tab } = useContext(TabContext);
  const {
    data: posts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useHomePostQuery(tab === 'rec' ? 'recommends' : 'followings');
  const nextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        hasNextPage && !isFetchingNextPage && fetchNextPage();
      }
    });
    if (nextRef.current) {
      observer.observe(nextRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  if (posts) {
    return (
      <>
        {posts.pages.map((page, i) => (
          <Fragment key={i}>
            {page.data.map((p) => {
              return <Post key={p.postId} post={p} />;
            })}
          </Fragment>
        ))}
        {isFetchingNextPage && <LoadingSpinner style={{ padding: '30px' }} />}
        {hasNextPage && (
          <div
            ref={nextRef}
            style={{
              padding: isFetchingNextPage ? '0' : '60px 0',
              textAlign: 'center',
            }}
          ></div>
        )}
      </>
    );
  }

  return null;
}
