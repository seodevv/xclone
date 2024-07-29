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
          return (
            <div key={i}>
              {matched.map((m, i) => {
                const index = t.indexOf(m);
                const hasPrev = matched[i - 1]
                  ? t.indexOf(matched[i - 1]) + matched[i - 1].length
                  : 0;
                const hasNext = matched[i + 1]
                  ? t.indexOf(matched[i + 1]) - 1
                  : undefined;
                const a = t.substring(hasPrev, index);
                const b = '#' + t.substring(index + 1, hasNext);
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
