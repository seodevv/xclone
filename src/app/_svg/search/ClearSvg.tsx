import styles from '../_style/svg.module.css';
import { CSSProperties, HTMLAttributes } from 'react';
import cx from 'classnames';

interface Props {
  className?: HTMLAttributes<HTMLOrSVGElement>['className'];
  style?: CSSProperties;
  width?: number;
  white?: boolean;
  fill?: string;
  inherit?: boolean;
}

export default function ClearSvg({
  className,
  style,
  width = 18.75,
  white,
  fill,
  inherit,
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
        <path d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm3.71 12.54l-1.42 1.42-2.29-2.3-2.29 2.3-1.42-1.42 2.3-2.29-2.3-2.29 1.42-1.42 2.29 2.3 2.29-2.3 1.42 1.42-2.3 2.29 2.3 2.29z"></path>
      </g>
    </svg>
  );
}
