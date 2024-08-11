import styles from '../_style/spinner.module.css';
import { CSSProperties } from 'react';
import cx from 'classnames';

interface Props {
  type?: 'block';
  className?: string;
  style?: CSSProperties;
  fill?: 'theme' | 'reverse';
  width?: number;
}

export default function SpinnerSvg({
  type = 'block',
  className,
  style,
  fill = 'theme',
  width = 24,
}: Props) {
  if (type === 'block') {
    return (
      <>
        <svg
          className={cx(
            styles.spinner,
            fill === 'reverse' && styles.reverse,
            className
          )}
          style={style}
          width={width}
          viewBox="0 0 24 24"
        >
          <rect
            className={styles.spinner_blocks_1}
            x="1"
            y="1"
            rx="1"
            width="10"
            height="10"
          />
          <rect
            className={cx(styles.spinner_blocks_1, styles.spinner_blocks_2)}
            x="1"
            y="1"
            rx="1"
            width="10"
            height="10"
          />
          <rect
            className={cx(styles.spinner_blocks_1, styles.spinner_blocks_3)}
            x="1"
            y="1"
            rx="1"
            width="10"
            height="10"
          />
        </svg>
      </>
    );
  }
}
