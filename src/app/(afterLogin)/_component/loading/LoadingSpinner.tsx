import styles from './loading.module.css';
import { CSSProperties } from 'react';
import cx from 'classnames';
import SpinnerSvg from '@/app/_svg/spinner/SpinnerSvg';

interface Props {
  className?: string;
  style?: CSSProperties;
  type?: 'block';
}

export default function LoadingSpinner({
  className,
  style,
  type = 'block',
}: Props) {
  return (
    <div className={cx(styles.loadingSpinner, className)} style={style}>
      <SpinnerSvg type={type} />
    </div>
  );
}
