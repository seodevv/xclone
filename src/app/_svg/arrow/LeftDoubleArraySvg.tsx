import styles from '../_style/svg.module.css';
import { CSSProperties } from 'react';
import cx from 'classnames';
import { SvgTheme } from '@/app/_svg/Svg';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  theme?: SvgTheme;
}

export default function LeftDoubleArrowSvg({
  className,
  style,
  width = 24,
  theme = 'default',
}: Props) {
  return (
    <svg
      className={cx(styles[theme], className)}
      style={style}
      width={width}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <g>
        <path d="M12.04 2.54l1.42 1.42L5.41 12l8.05 8.04-1.42 1.42L2.59 12l9.45-9.46zm7 0l1.42 1.42L12.41 12l8.05 8.04-1.42 1.42L9.59 12l9.45-9.46z"></path>
      </g>
    </svg>
  );
}
