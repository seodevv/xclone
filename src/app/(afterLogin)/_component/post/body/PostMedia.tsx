'use client';

import MultySvg from '@/app/_svg/post/MultySvg';
import styles from './media.module.css';
import { generateImagePath } from '@/app/_lib/common';
import { AdvancedPost } from '@/model/Post';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  post: AdvancedPost;
  row?: number;
  gap?: number;
}

export default function PostMedia({ post, row = 3, gap = 2 }: Props) {
  const [hover, setHover] = useState(false);

  const first = post.images.at(0);
  if (!first) return null;

  return (
    <Link
      href={`/${post.User.id}/status/${post.postId}/photo/${first.imageId}`}
      className={styles.postMedia}
      style={{ width: `calc(${100 / row}% - ${gap}px)` }}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      scroll={false}
    >
      <Image
        src={generateImagePath(first.link)}
        alt={first.imageId.toString()}
        width={first.width}
        height={first.height}
      />
      {post.images.length > 1 && (
        <MultySvg className={styles.postMediaMulty} white />
      )}
      {hover && <div className={styles.postMediaHover}></div>}
    </Link>
  );
}
