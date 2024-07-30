'use client';

import style from './media.module.css';
import Link from 'next/link';
import Image from 'next/image';
import cx from 'classnames';
import { generateImagePath } from '@/app/_lib/common';
import { AdvancedPost } from '@/model/Post';

interface Props {
  userId: AdvancedPost['User']['id'];
  postId: AdvancedPost['postId'];
  images: AdvancedPost['images'];
  isSingle?: boolean;
}
export default function PostImages({
  userId,
  postId,
  images,
  isSingle = false,
}: Props) {
  if (!images || !images.length) return null;

  return (
    <div
      className={cx(
        style.postImages,
        style[`postImages-${images.length}`],
        isSingle && style.single
      )}
    >
      {images.map((image, index) => {
        const isGif = image.link.endsWith('.gif');
        return (
          <Link
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
