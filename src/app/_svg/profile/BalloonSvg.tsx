import styles from '../_style/svg.module.css';
import cx from 'classnames';
import { CSSProperties } from 'react';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  white?: boolean;
  inherit?: boolean;
}

export default function BalloonSvg({
  className,
  style,
  width = 18.75,
  white,
  inherit,
}: Props) {
  return (
    <svg
      className={cx(
        styles.defaultSvg,
        white && styles.white,
        inherit && styles.inherit,
        className
      )}
      style={style}
      width={width}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <g>
        <path d="M8 10c0-2.21 1.79-4 4-4v2c-1.1 0-2 .9-2 2H8zm12 1c0 4.27-2.69 8.01-6.44 8.83L15 22H9l1.45-2.17C6.7 19.01 4 15.27 4 11c0-4.84 3.46-9 8-9s8 4.16 8 9zm-8 7c3.19 0 6-3 6-7s-2.81-7-6-7-6 3-6 7 2.81 7 6 7z"></path>{' '}
      </g>
    </svg>
  );
}
