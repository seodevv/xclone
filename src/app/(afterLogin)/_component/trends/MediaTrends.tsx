'use client';

import styles from './mediaTrends.module.css';
import cx from 'classnames';
import Text from '@/app/_component/_text/Text';
import { usePostMediaRecommendsQuery } from '@/app/(afterLogin)/_hooks/usePostMediaRecommendsQuery';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import DisConnection from '@/app/(afterLogin)/_component/error/DisConnection';
import Image from 'next/image';
import { generateImagePath } from '@/app/_lib/common';
import ArrowButton from '@/app/(afterLogin)/_component/buttons/ArrowButton';
import { MouseEventHandler, useLayoutEffect, useRef, useState } from 'react';
import { AdvancedPost } from '@/model/Post';
import { useRouter } from 'next/navigation';

export default function MediaTrends() {
  const router = useRouter();
  const {
    data: medias,
    isLoading,
    isError,
    refetch,
  } = usePostMediaRecommendsQuery();
  const [position, setPosition] = useState({
    index: 0,
    transit: 0,
    leftOver: 0,
  });
  const mediasRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const onClickPrev: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (typeof medias === 'undefined') return;
    if (position.index <= 0) return;
    setPosition((prev) => ({
      ...prev,
      index: prev.index - prev.transit,
      leftOver: prev.leftOver + prev.transit,
    }));
  };
  const onClickNext: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (typeof medias === 'undefined') return;
    if (position.leftOver <= 0) return;
    setPosition((prev) => ({
      ...prev,
      index: prev.index + prev.transit,
      leftOver: prev.leftOver - prev.transit,
    }));
  };
  const onClickMedia = (post: AdvancedPost) => {
    router.push(`/${post.userid}/status/${post.postid}`);
  };

  useLayoutEffect(() => {
    if (innerRef.current && mediasRef.current) {
      const leftOver =
        innerRef.current.clientWidth - mediasRef.current.clientWidth;
      setPosition((prev) => ({ ...prev, transit: leftOver / 3, leftOver }));
    }
  }, []);

  if (medias) {
    return (
      <>
        <MediaTrendsTitle />
        <div className={styles.medias} ref={mediasRef}>
          {position.index !== 0 && (
            <ArrowButton
              className={cx(styles.controller, styles.prev)}
              type="left"
              onClick={onClickPrev}
            />
          )}
          <div
            className={styles.inner}
            style={{ transform: `translateX(${-position.index}px)` }}
            ref={innerRef}
          >
            {medias.pages.map((page) =>
              page.data.map((p) => {
                const link = p.images[0].link;
                const gif = /\.gif$/.test(link);
                return (
                  <div
                    key={p.postid}
                    className={styles.media}
                    onClick={() => onClickMedia(p)}
                  >
                    <Image
                      className={cx(styles.image, styles.absolute)}
                      src={generateImagePath(p.images[0].link)}
                      alt={p.images[0].link}
                      width={162}
                      height={207}
                      unoptimized={gif}
                    />
                    <div
                      className={cx(styles.imageHover, styles.absolute)}
                    ></div>
                  </div>
                );
              })
            )}
          </div>
          {position.leftOver !== 0 && (
            <ArrowButton
              className={cx(styles.controller, styles.next)}
              type="right"
              onClick={onClickNext}
            />
          )}
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <MediaTrendsTitle />
        <LoadingSpinner />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <MediaTrendsTitle />
        <DisConnection onClick={() => refetch()} />
      </>
    );
  }

  return null;
}

function MediaTrendsTitle() {
  return (
    <div className={styles.title}>
      <Text text="Medias for you" size="xl" bold="bold">
        <Text
          text="Check out these popular and trending videos for you"
          theme="gray"
          size="xs"
        />
      </Text>
    </div>
  );
}
