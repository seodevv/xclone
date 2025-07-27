import styles from '../_style/svg.module.css';
import { CSSProperties, HTMLAttributes } from 'react';
import cx from 'classnames';

interface Props {
  className?: HTMLAttributes<HTMLOrSVGElement>['className'];
  style?: CSSProperties;
  direction?: 'left' | 'right';
  theme?: 'default' | 'primary' | 'white';
  full?: boolean;
  width?: number;
}

export default function ReplySvg({
  className,
  style,
  direction = 'right',
  theme = 'default',
  full = false,
  width = 18.75,
}: Props) {
  return (
    <svg
      className={cx(
        theme === 'default' && styles.defaultSvg,
        theme === 'primary' && styles.primary,
        theme === 'white' && styles.white,
        direction === 'left' && styles.replyLeft,
        className
      )}
      style={style}
      width={width}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <g>
        {full ? (
          <path d="M23.259 10.5L12 .648v5.581C5.269 7.328 1.995 12.498 2 22.001h2c0-1.914.705-3.537 2.095-4.825 1.5-1.391 3.739-2.259 5.905-2.331v5.507L23.259 10.5z"></path>
        ) : (
          <path d="M12 6.229C5.269 7.328 1.995 12.498 2 22.001h2c0-1.914.705-3.537 2.095-4.825 1.5-1.391 3.739-2.259 5.905-2.331v5.507L23.259 10.5 12 .648v5.581zm2 1.773V5.056l6.222 5.443L14 15.942v-3.004l-.924-.07c-.265-.021-.531-.03-.798-.03-2.765 0-5.594 1.064-7.542 2.87l-.129.122c1.13-4.802 3.874-7.242 8.499-7.733l.895-.095z"></path>
        )}
      </g>
    </svg>
  );
}
