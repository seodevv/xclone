import styles from './postBody.module.css';
import { CSSProperties } from 'react';
import cx from 'classnames';
import { unitConversion } from '@/app/_lib/common';

interface Props {
  className?: string;
  style?: CSSProperties;
}

export default function PostView({ className, style }: Props) {
  return (
    <span className={cx(styles.postView, className)} style={style}>
      <span>{unitConversion(1234)}</span>
      <span>Views</span>
    </span>
  );
}
