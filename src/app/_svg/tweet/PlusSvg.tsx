import styles from '../_style/svg.module.css';
import { CSSProperties, HTMLAttributes } from 'react';
import cx from 'classnames';

interface Props {
  className?: HTMLAttributes<HTMLOrSVGElement>['className'];
  style?: CSSProperties;
  width?: number;
  white?: boolean;
  inherit?: boolean;
  fill?: string;
}

export default function PlusSvg({
  className,
  style,
  width = 18.75,
  white,
  inherit,
  fill,
}: Props) {
  return (
    <svg
      className={cx(
        styles.defaultSvg,
        white && styles.white,
        inherit && styles.inherit,
        className
      )}
      style={style}
      width={width}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill={fill}
    >
      <g>
        <path d="M11 11V4h2v7h7v2h-7v7h-2v-7H4v-2h7z"></path>
      </g>
    </svg>
  );
}
