'use client';

import styles from './postBody.module.css';
import { CSSProperties, Fragment, useState } from 'react';
import Link from 'next/link';
import cx from 'classnames';
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
  const splited = content.split(/\r\n|\r|\n/);
  const [more, setMore] = useState(
    splited.length > 10 && !isSingle ? true : false
  );

  return (
    <div
      className={cx(styles.postContent, isSingle && styles.single, className)}
      style={style}
    >
      {splited.map((t, i) => {
        if (more && i >= 10) return null;

        const regex = /#[^\s#)\]]+/g;
        const matched = t.match(regex);
        if (matched) {
          let lastIndex = 0;
          return (
            <div key={i}>
              {matched.map((m, i) => {
                const index = t.indexOf(m, lastIndex);
                const a = t.substring(lastIndex, index);
                const b = t.substring(index, index + m.length);
                lastIndex = index + m.length;
                return (
                  <Fragment key={i}>
                    <span>{a}</span>
                    <Link
                      href={`/search?q=${encodeURIComponent(b)}`}
                      className={styles.hashtag}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {b}
                    </Link>
                  </Fragment>
                );
              })}
            </div>
          );
        }

        return (
          <div key={i}>
            {t}
            {more && i === 9 && '...'}
          </div>
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
