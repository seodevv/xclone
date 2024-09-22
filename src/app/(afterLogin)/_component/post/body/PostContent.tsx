'use client';

import styles from './postBody.module.css';
import utils from '@/app/utility.module.css';
import { CSSProperties, Fragment, useState } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { AdvancedPost } from '@/model/Post';
import { Mode } from '@/app/(afterLogin)/_component/post/Post';
import { AnalysisText } from '@/app/(afterLogin)/[username]/_component/_profile/UserDesc';

interface Props {
  className?: string;
  style?: CSSProperties;
  mode?: Mode;
  postId: AdvancedPost['postId'];
  userId: AdvancedPost['userId'];
  content: AdvancedPost['content'];
}

export default function PostContent({
  className,
  style,
  mode,
  postId,
  userId,
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
        // const regex = /#[^\s#)\]]+/g;
        // const matched = t.match(regex);
        // if (matched) {
        //   let lastIndex = 0;
        //   return (
        //     <div key={i}>
        //       {matched.map((m, i) => {
        //         const index = t.indexOf(m, lastIndex);
        //         const a = t.substring(lastIndex, index);
        //         const b = t.substring(index, index + m.length);
        //         lastIndex = index + m.length;
        //         return (
        //           <Fragment key={i}>
        //             <span>{a}</span>
        //             <Link
        //               href={`/search?q=${encodeURIComponent(b)}`}
        //               className={styles.hashtag}
        //               onClick={(e) => e.stopPropagation()}
        //             >
        //               {b}
        //             </Link>
        //           </Fragment>
        //         );
        //       })}
        //     </div>
        //   );
        // }

        // return (
        //   <div key={i}>
        //     {t}
        //     {more && i === 9 && '...'}
        //   </div>
        // );
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
