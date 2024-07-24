'use client';

import Link from 'next/link';
import styles from './post.module.css';
import { CSSProperties, MouseEventHandler, useEffect, useState } from 'react';
import { AdvancedPost } from '@/model/Post';

interface Props {
  className?: string;
  style?: CSSProperties;
  postId: AdvancedPost['postId'];
  userId: AdvancedPost['userId'];
  content: AdvancedPost['content'];
  isSingle?: boolean;
}

export default function PostContent({
  className,
  style,
  postId,
  userId,
  content,
  isSingle,
}: Props) {
  const [more, setMore] = useState(false);
  const splited = content.split(/\r\n|\r|\n/);

  useEffect(() => {
    if (splited.length > 10 && !isSingle) {
      setMore(true);
    } else {
      setMore(false);
    }
  }, [setMore]);

  return (
    <div className={className} style={style}>
      {splited.map((t, i) => {
        if (more && i >= 10) return null;
        return (
          <span key={i}>
            {t}
            {more && i === 9 && '...'}
          </span>
        );
      })}
      {more && (
        <Link
          href={`/${userId}/status/${postId}`}
          className={styles.contentMore}
          onClick={(e) => e.stopPropagation()}
        >
          Show more
        </Link>
      )}
    </div>
  );
}
