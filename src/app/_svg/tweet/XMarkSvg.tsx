import styles from '../_style/svg.module.css';
import cx from 'classnames';
import { CSSProperties } from 'react';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  theme?: 'default' | 'primary' | 'theme' | 'reverse' | 'white';
}

export default function XMarkSvg({
  className,
  style,
  theme = 'default',
  width = 18,
}: Props) {
  return (
    <svg
      className={cx(
        theme === 'default' && styles.defaultSvg,
        theme === 'primary' && styles.primary,
        theme === 'theme' && styles.theme,
        theme === 'reverse' && styles.reverse,
        theme === 'white' && styles.white,
        className
      )}
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
