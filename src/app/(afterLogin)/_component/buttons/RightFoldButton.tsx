import styles from './button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';
import RightDoubleArrowSvg from '@/app/_svg/arrow/RightDoubleArrowSvg';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function RightFoldButton({
  className,
  style,
  width = 20,
  onClick,
}: Props) {
  return (
    <button
      className={cx(styles.btn, className)}
      style={style}
      onClick={onClick}
    >
      <RightDoubleArrowSvg width={width} />
    </button>
  );
}
