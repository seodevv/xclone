import styles from './postBody.module.css';
import { CSSProperties } from 'react';
import cx from 'classnames';
import { unitConversion } from '@/app/_lib/common';

interface Props {
  className?: string;
  style?: CSSProperties;
  count?: number;
}

export default function PostView({ className, style, count = 0 }: Props) {
  return (
    <span className={cx(styles.postView, className)} style={style}>
      <span>{unitConversion(count)}</span>
      <span>Views</span>
    </span>
  );
}
