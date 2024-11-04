import styles from '../_style/svg.module.css';
import { CSSProperties } from 'react';
import cx from 'classnames';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  white?: boolean;
}

export default function DesktopSvg({
  className,
  style,
  width = 24,
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
        <path d="M21 16V4.5C21 3.12 19.88 2 18.5 2h-13C4.12 2 3 3.12 3 4.5V16H1v4c0 1.103.897 2 2 2h18c1.103 0 2-.897 2-2v-4h-2zM5 4.5c0-.28.22-.5.5-.5h13c.28 0 .5.22.5.5V16H5V4.5zM3 20v-2h18v2H3z"></path>
      </g>
    </svg>
  );
}
