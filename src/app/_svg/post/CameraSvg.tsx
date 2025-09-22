import styles from '../_style/svg.module.css';
import { CSSProperties, HTMLAttributes } from 'react';
import cx from 'classnames';

interface Props {
  className?: HTMLAttributes<HTMLOrSVGElement>['className'];
  style?: CSSProperties;
  width?: number;
  theme?: 'default' | 'theme' | 'reverse' | 'white';
}

export default function CameraSvg({
  className,
  style,
  width = 18.75,
  theme = 'default',
}: Props) {
  return (
    <svg
      className={cx(
        theme === 'default' && styles.defaultSvg,
        theme === 'theme' && styles.theme,
        theme === 'reverse' && styles.reverse,
        theme === 'white' && styles.white,
        className
      )}
      style={style}
      width={width}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <g>
        <path d="M9.697 3h4.606l3 2H19c1.381 0 2.5 1.119 2.5 2.5v11c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zm.606 2l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5v-11c0-.276-.224-.5-.5-.5h-2.303l-3-2h-3.394zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4z"></path>
      </g>
    </svg>
  );
}
