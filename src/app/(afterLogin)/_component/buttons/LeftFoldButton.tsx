import styles from './button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';
import LeftDoubleArrowSvg from '@/app/_svg/arrow/LeftDoubleArraySvg';
import { SvgTheme } from '@/app/_svg/Svg';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  theme?: SvgTheme;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function LeftFoldButton({
  className,
  style,
  width = 20,
  theme,
  onClick,
}: Props) {
  return (
    <button
      className={cx(styles.btn, className)}
      style={style}
      onClick={onClick}
    >
      <LeftDoubleArrowSvg width={width} theme={theme} />
    </button>
  );
}
