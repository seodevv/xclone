import styles from '../_style/svg.module.css';
import { CSSProperties } from 'react';
import cx from 'classnames';

interface Props {
  className?: string;
  style?: CSSProperties;
  white?: boolean;
  width?: number;
  active?: boolean;
}

export default function LockSvg({
  className,
  style,
  white,
  width = 18.75,
  active,
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
        {active ? (
          <path d="M17.5 7H17v-.25c0-2.76-2.24-5-5-5s-5 2.24-5 5V7h-.5C5.12 7 4 8.12 4 9.5v9C4 19.88 5.12 21 6.5 21h11c1.39 0 2.5-1.12 2.5-2.5v-9C20 8.12 18.89 7 17.5 7zM13 14.73V17h-2v-2.27c-.59-.34-1-.99-1-1.73 0-1.1.9-2 2-2 1.11 0 2 .9 2 2 0 .74-.4 1.39-1 1.73zM15 7H9v-.25c0-1.66 1.35-3 3-3 1.66 0 3 1.34 3 3V7z"></path>
        ) : (
          <path d="M14 13c0 .74-.4 1.39-1 1.73V17h-2v-2.27c-.59-.34-1-.99-1-1.73 0-1.1.9-2 2-2 1.11 0 2 .9 2 2zm3.5-6H17v-.25c0-2.76-2.24-5-5-5s-5 2.24-5 5V7h-.5C5.12 7 4 8.12 4 9.5v9C4 19.88 5.12 21 6.5 21h11c1.38 0 2.5-1.12 2.5-2.5v-9C20 8.12 18.88 7 17.5 7zM9 6.75c0-1.66 1.34-3 3-3s3 1.34 3 3V7H9v-.25zm9 11.75c0 .28-.22.5-.5.5h-11c-.28 0-.5-.22-.5-.5v-9c0-.28.22-.5.5-.5h11c.28 0 .5.22.5.5v9z"></path>
        )}
      </g>
    </svg>
  );
}
