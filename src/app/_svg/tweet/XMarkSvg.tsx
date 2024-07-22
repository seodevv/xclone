import { CSSProperties } from 'react';
import styles from '../_style/svg.module.css';
import cx from 'classnames';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  white?: boolean;
}

export default function XMarkSvg({
  className,
  style,
  width = 18,
  white,
}: Props) {
  return (
    <svg
      className={cx(styles.defaultSvg, white && styles.white, className)}
      style={style}
      width={width}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <g>
        <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
      </g>
    </svg>
  );
}
