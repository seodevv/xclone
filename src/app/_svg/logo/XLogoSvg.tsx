import styles from '../_style/svg.module.css';
import cx from 'classnames';
import { CSSProperties } from 'react';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  fill?: string;
  theme?: 'default' | 'theme' | 'white';
}

export default function XLogoSvg({
  className,
  style,
  width = 50,
  fill = '#fff',
  theme = 'default',
}: Props) {
  return (
    <svg
      className={cx(
        theme === 'default' && styles.defaultSvg,
        theme === 'theme' && styles.theme,
        theme === 'white' && styles.white,
        className
      )}
      style={style}
      width={width}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill={fill}
    >
      <g>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
      </g>
    </svg>
  );
}
