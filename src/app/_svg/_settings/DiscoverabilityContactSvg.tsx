import styles from '../_style/svg.module.css';
import { CSSProperties } from 'react';
import cx from 'classnames';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  white?: boolean;
}

export default function DiscoverabilityContactSvg({
  className,
  style,
  width = 18.75,
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
        <path d="M11 4c-3.87 0-7 3.13-7 7s3.13 7 7 7c1.93 0 3.68-.78 4.95-2.05S18 12.93 18 11c0-3.87-3.13-7-7-7zm-9 7c0-4.97 4.03-9 9-9s9 4.03 9 9c0 2.12-.74 4.08-1.97 5.62l3.68 3.67-1.41 1.42-3.68-3.68C15.08 19.26 13.13 20 11 20c-4.97 0-9-4.03-9-9zm11.5-2.5c0 1.38-1.12 2.5-2.5 2.5S8.5 9.88 8.5 8.5 9.62 6 11 6s2.5 1.12 2.5 2.5zm-6.76 5.97C7.58 12.89 9.07 12 11 12s3.42.89 4.26 2.47c-1 1.24-2.54 2.03-4.26 2.03s-3.26-.79-4.26-2.03z"></path>
      </g>
    </svg>
  );
}
