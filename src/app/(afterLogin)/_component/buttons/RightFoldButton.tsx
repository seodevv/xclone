import styles from './button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';
import RightDoubleArrowSvg from '@/app/_svg/arrow/RightDoubleArrowSvg';
import { SvgTheme } from '@/app/_svg/Svg';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  theme?: SvgTheme;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function RightFoldButton({
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
      <RightDoubleArrowSvg width={width} theme={theme} />
    </button>
  );
}
