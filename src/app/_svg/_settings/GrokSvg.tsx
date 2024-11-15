import styles from '../_style/svg.module.css';
import { CSSProperties } from 'react';
import cx from 'classnames';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  white?: boolean;
}

export default function GrokSvg({
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
        <g clipPath="url(#7-clip0_2592_269)" clipRule="evenodd">
          <path d="M18 4.1H6c-1.05 0-1.9.85-1.9 1.9v12c0 1.05.85 1.9 1.9 1.9h12c1.05 0 1.9-.85 1.9-1.9V6c0-1.05-.85-1.9-1.9-1.9zM6 2h12c2.21 0 4 1.79 4 4v12c0 2.21-1.79 4-4 4H6c-2.21 0-4-1.79-4-4V6c0-2.21 1.79-4 4-4z"></path>
          <path d="M6.68 17.8l8.108-11.58h2.532L9.21 17.8H6.68z"></path>
        </g>
        <defs>
          <clipPath id="7-clip0_2592_269">
            <rect height="20" rx="1" width="20" x="2" y="2"></rect>
          </clipPath>
        </defs>
      </g>
    </svg>
  );
}
