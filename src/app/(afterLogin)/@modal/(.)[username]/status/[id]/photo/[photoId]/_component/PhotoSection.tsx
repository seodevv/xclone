'use client';

import styles from '../_style/photoModal.module.css';
import { useContext, useState } from 'react';
import Image from 'next/image';
import { useSinglePostQuery } from '@/app/(afterLogin)/[username]/status/[id]/_hooks/useSinglePostQuery';
import { generateImagePath } from '@/app/_lib/common';
import CloseButton from '@/app/(afterLogin)/_component/buttons/CloseButton';
import NextButton from '@/app/(afterLogin)/_component/buttons/NextButton';
import PrevButton from '@/app/(afterLogin)/_component/buttons/PrevButton';
import { FoldContext } from '../_provider/FoldProvider';
import RightFoldButton from '@/app/(afterLogin)/_component/buttons/RightFoldButton';
import LeftFoldButton from '@/app/(afterLogin)/_component/buttons/LeftFoldButton';
import ActionButtons from '@/app/(afterLogin)/_component/post/body/ActionButtons';

interface Props {
  params: { username: string; id: string; photoId: string };
}

export default function PhotoSection({ params }: Props) {
  const { fold, setFold } = useContext(FoldContext);
  const { data: post } = useSinglePostQuery(params);
  const [index, setIndex] = useState(
    post.data.images.findIndex((image) => image.imageId === ~~params.photoId)
  );
  const hasPrev = !!post.data.images[index - 1];
  const hasNext = !!post.data.images[index + 1];

  const onClickPrev = () => {
    if (!hasPrev) return;
    const prevId = post.data.images[index - 1].imageId;
    history.replaceState({ id: prevId }, '', prevId.toString());
    setIndex((prev) => prev - 1);
  };
  const onClickNext = () => {
    if (!hasNext) return;
    const nextId = post.data.images[index + 1].imageId;
    history.replaceState({ id: nextId }, '', nextId.toString());
    setIndex((prev) => prev + 1);
  };
  const onClickFold = () => {
    setFold((prev) => !prev);
  };

  return (
    <section className={styles.photoSection}>
      <div className={styles.imageSection}>
        <div className={styles.imageCarousel}>
          {post.data.images.map((image) => (
            <Image
              key={image.imageId}
              src={generateImagePath(image.link)}
              alt={image.imageId.toString()}
              width={image.width}
              height={image.height}
              style={{ transform: `translateX(${-100 * index}%)` }}
            />
          ))}
        </div>
        <CloseButton
          className={styles.photoClose}
          width={20}
          position="absolute"
          theme="theme"
          bg
        />
        {hasPrev && (
          <PrevButton
            className={styles.photoPrev}
            width={20}
            onClick={onClickPrev}
          />
        )}
        {hasNext && (
          <NextButton
            className={styles.photoNext}
            width={20}
            onClick={onClickNext}
          />
        )}
        {fold ? (
          <LeftFoldButton
            className={styles.postFold}
            width={20}
            onClick={onClickFold}
            theme="theme"
          />
        ) : (
          <RightFoldButton
            className={styles.postFold}
            width={20}
            onClick={onClickFold}
            theme="theme"
          />
        )}
      </div>
      <div className={styles.reactionSection}>
        <div className={styles.reaction}>
          <ActionButtons post={post.data} width={22.5} white isPhoto />
        </div>
      </div>
    </section>
  );
}
