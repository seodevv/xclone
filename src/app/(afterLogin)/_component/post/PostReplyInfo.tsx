import styles from './post.module.css';
import { CSSProperties } from 'react';
import cx from 'classnames';
import Link from 'next/link';

interface Props {
  className?: string;
  style?: CSSProperties;
  id: string;
}

export default function PostReplyInfo({ className, style, id }: Props) {
  return (
    <div className={cx(styles.postReplyInfo, className)} style={style}>
      <span>Replying to</span>
      <Link href={`/${id}`} onClick={(e) => e.stopPropagation()}>
        @{id}
      </Link>
    </div>
  );
}
