import styles from '../_style/svg.module.css';
import { CSSProperties } from 'react';
import cx from 'classnames';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  theme?: 'default' | 'theme' | 'white';
}

export default function RightArrowSvg({
  className,
  style,
  width = 24,
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
    >
      <g>
        <path d="M12.957 4.54L20.414 12l-7.457 7.46-1.414-1.42L16.586 13H3v-2h13.586l-5.043-5.04 1.414-1.42z"></path>
      </g>
    </svg>
  );
}
