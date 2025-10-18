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
      href={`/${post.User.id}/status/${post.postid}/photo/${first.imageId}`}
      style={{ width: `calc(${100 / row}% - ${gap}px)` }}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      scroll={false}
    >
      <div className={styles.relative}>
        <div className={styles.pad}></div>
        <div className={styles.absolute}>
          <Image
            className={styles.media}
            src={generateImagePath(first.link)}
            alt={first.imageId.toString()}
            width={first.width}
            height={first.height}
            unoptimized={first.link.endsWith('.gif')}
          />
        </div>
        {hover && <div className={styles.postMediaHover}></div>}
        {post.images.length > 1 && (
          <MultySvg className={styles.postMediaMulty} white />
        )}
      </div>
    </Link>
  );
}
