'use client';

import styles from './postBody.module.css';
import utils from '@/app/utility.module.css';
import { CSSProperties, useState } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { AdvancedPost } from '@/model/Post';
import { Mode } from '@/app/(afterLogin)/_component/post/Post';
import { AnalysisText } from '@/app/(afterLogin)/[username]/_component/_profile/UserDesc';

interface Props {
  className?: string;
  style?: CSSProperties;
  mode?: Mode;
  postid: AdvancedPost['postid'];
  userid: AdvancedPost['userid'];
  content: AdvancedPost['content'];
}

export default function PostContent({
  className,
  style,
  mode,
  postid,
  userid,
  content,
}: Props) {
  const splited = content.split(/\r\n|\r|\n/);
  const [more, setMore] = useState(
    splited.length > 10 && mode !== 'single' ? true : false
  );

  return (
    <div
      className={cx(
        styles.postContent,
        mode === 'single' && utils.mt_12,
        className
      )}
      style={style}
    >
      {splited.map((t, i) => {
        if (more && i >= 10) return null;

        return <AnalysisText key={i} text={t} />;
      })}
      {more && (
        <Link
          href={`/${userid}/status/${postid}`}
          className={styles.contentMore}
          onClick={(e) => e.stopPropagation()}
        >
          Show more
        </Link>
      )}
    </div>
  );
}
