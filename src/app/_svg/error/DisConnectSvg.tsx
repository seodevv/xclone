import styles from '../_style/svg.module.css';
import { CSSProperties, HTMLAttributes } from 'react';
import cx from 'classnames';

interface Props {
  className?: HTMLAttributes<HTMLOrSVGElement>['className'];
  style?: CSSProperties;
  width?: number;
  white?: boolean;
}

export default function DisConnectSvg({
  className,
  style,
  width = 40,
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
        <path d="M3.707 21.71l17-17-1.414-1.42-2.555 2.56C15.492 4.7 13.828 4 12 4 9.142 4 6.686 5.71 5.598 8.16 2.96 8.8 1 11.17 1 14c0 2.06 1.04 3.88 2.625 4.96l-1.332 1.33 1.414 1.42zm1.37-4.2C3.839 16.83 3 15.51 3 14c0-2.03 1.506-3.7 3.459-3.96l.611-.09.201-.58C7.947 7.41 9.811 6 12 6c1.275 0 2.438.48 3.322 1.26L5.077 17.51zM8.243 20l2-2H18c1.657 0 3-1.34 3-3s-1.343-3-3-3v-2c2.761 0 5 2.24 5 5s-2.239 5-5 5H8.243z"></path>
      </g>
    </svg>
  );
}
