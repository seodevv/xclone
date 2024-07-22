import styles from '../_style/svg.module.css';
import { CSSProperties, HTMLAttributes } from 'react';
import cx from 'classnames';

interface Props {
  className?: HTMLAttributes<HTMLOrSVGElement>['className'];
  style?: CSSProperties;
  width?: number;
}

export default function OptionSvg({ className, style, width = 18.75 }: Props) {
  return (
    <svg
      className={cx(styles.defaultSvg, className)}
      style={style}
      width={width}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <g>
        <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
      </g>
    </svg>
  );
}
