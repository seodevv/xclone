import styles from '../_style/svg.module.css';
import { CSSProperties } from 'react';
import cx from 'classnames';

interface Props {
  className?: string;
  style?: CSSProperties;
  type?: 'no-line' | 'line';
  theme?: 'default' | 'primary' | 'white';
  width?: number;
}

export default function DownArrowSvg({
  className,
  style,
  type = 'no-line',
  theme = 'default',
  width = 24,
}: Props) {
  return (
    <svg
      className={cx(
        theme === 'default' && styles.defaultSvg,
        theme === 'primary' && styles.primary,
        theme === 'white' && styles.white,
        className
      )}
      style={style}
      width={width}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <g>
        {type === 'no-line' ? (
          <path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z"></path>
        ) : (
          <path d="M13 3v13.59l5.043-5.05 1.414 1.42L12 20.41l-7.457-7.45 1.414-1.42L11 16.59V3h2z"></path>
        )}
      </g>
    </svg>
  );
}
