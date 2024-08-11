import styles from './loading.module.css';
import { CSSProperties } from 'react';
import cx from 'classnames';
import SpinnerSvg from '@/app/_svg/spinner/SpinnerSvg';

interface Props {
  className?: string;
  style?: CSSProperties;
  type?: 'block';
  fill?: 'theme' | 'reverse';
}

export default function LoadingSpinner({
  className,
  style,
  type = 'block',
  fill,
}: Props) {
  return (
    <div className={cx(styles.loadingSpinner, className)} style={style}>
      <SpinnerSvg type={type} fill={fill} />
    </div>
  );
}
