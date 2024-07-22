import styles from '../_style/spinner.module.css';
import cx from 'classnames';
import { CSSProperties } from 'react';

interface Props {
  type?: 'block';
  className?: string;
  style?: CSSProperties;
  width?: number;
}

export default function SpinnerSvg({
  type = 'block',
  className,
  style,
  width = 24,
}: Props) {
  if (type === 'block') {
    return (
      <>
        <svg
          className={className ? className : styles.spinner}
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
