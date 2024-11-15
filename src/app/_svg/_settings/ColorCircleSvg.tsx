import styles from '../_style/svg.module.css';
import { CSSProperties } from 'react';
import cx from 'classnames';

interface Props {
  className?: string;
  style?: CSSProperties;
  type: 'blue' | 'yellow' | 'pink' | 'purple' | 'orange' | 'green';
  width?: number;
}

export default function ColorCircleSvg({
  className,
  style,
  type,
  width = 45,
}: Props) {
  return (
    <svg
      className={cx(styles[type], className)}
      style={style}
      width={width}
      height={width}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <g>
        <circle cx="12" cy="12" r="10.3"></circle>
      </g>
    </svg>
  );
}
