'use client';

import styles from './media.module.css';
import utils from '@/app/utility.module.css';
import Link from 'next/link';
import Image from 'next/image';
import cx from 'classnames';
import { generateImagePath } from '@/app/_lib/common';
import { AdvancedPost } from '@/model/Post';
import { Mode } from '@/app/(afterLogin)/_component/post/Post';

interface Props {
  className?: string;
  mode?: Mode;
  userId: AdvancedPost['User']['id'];
  postId: AdvancedPost['postId'];
  images: AdvancedPost['images'];
  short?: boolean;
}
export default function PostImages({
  className,
  mode = 'post',
  userId,
  postId,
  images,
  short,
}: Props) {
  if (!images || !images.length) return null;

  return (
    <div
      className={cx(
        styles.postImages,
        styles[`postImages-${images.length}`],
        mode === 'single' && styles.single,
        short && styles.short,
        className
      )}
    >
      {images.map((image, index) => {
        const isGif = image.link.endsWith('.gif');
        return (
          <Link
            className={cx(
              ['compose'].includes(mode) && utils.pointer_event_none
            )}
            key={index}
            href={`/${userId}/status/${postId}/photo/${image.imageId}`}
            onClick={(e) => e.stopPropagation()}
            scroll={false}
          >
            <Image
              src={generateImagePath(image.link)}
              alt={image.imageId.toString()}
              width={image.width > 600 ? 600 : image.width}
              height={
                image.width > 600
                  ? (image.height * 600) / image.width
                  : image.height
              }
              unoptimized={isGif}
            />
          </Link>
        );
      })}
    </div>
  );
}
