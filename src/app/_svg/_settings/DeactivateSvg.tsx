import styles from '../_style/svg.module.css';
import { CSSProperties } from 'react';
import cx from 'classnames';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  white?: boolean;
}

export default function DeactivateSvg({
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
        <path d="M21.398 6.52c-.887-1.79-2.647-2.91-4.601-3.01-1.65-.09-3.367.56-4.796 2.01-1.43-1.45-3.147-2.1-4.798-2.01-1.954.1-3.714 1.22-4.601 3.01-.896 1.81-.846 4.17.514 6.67 1.353 2.48 4.003 5.12 8.382 7.67l.504.3.503-.3c4.378-2.55 7.028-5.19 8.379-7.67 1.36-2.5 1.41-4.86.514-6.67zm-2.27 5.71c-1.074 1.97-3.256 4.27-7.126 6.61-3.872-2.34-6.055-4.64-7.129-6.61-1.112-2.04-1.031-3.7-.479-4.82.561-1.13 1.667-1.84 2.91-1.91 1.077-.05 2.338.38 3.452 1.61L8.588 10.3l4.009 2.5-1.428 2.15 1.665 1.1 2.569-3.85-3.991-2.5 1.405-2.06c1.21-1.63 2.662-2.2 3.88-2.14 1.242.07 2.347.78 2.908 1.91.553 1.12.634 2.78-.477 4.82z"></path>
      </g>
    </svg>
  );
}