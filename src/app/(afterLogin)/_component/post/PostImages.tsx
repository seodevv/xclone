'use client';

import Link from 'next/link';
import style from './postImages.module.css';
import cx from 'classnames';
import Image from 'next/image';
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
        isSingle && style.isSinglePostImage
      )}
    >
      {images.map((image, index) => (
        <Link
          key={index}
          href={`/${userId}/status/${postId}/photo/${image.imageId}`}
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
          />
        </Link>
      ))}
    </div>
  );
}
