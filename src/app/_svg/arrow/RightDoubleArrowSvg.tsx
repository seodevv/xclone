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

export default function RightDoubleArrowSvg({
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
        <path d="M11.59 12L3.54 3.96l1.42-1.42L14.41 12l-9.45 9.46-1.42-1.42L11.59 12zm7 0l-8.05-8.04 1.42-1.42L21.41 12l-9.45 9.46-1.42-1.42L18.59 12z"></path>
      </g>
    </svg>
  );
}
