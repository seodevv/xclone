import styles from './button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';
import LeftArrowSvg from '@/app/_svg/arrow/LeftArrowSvg';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function PrevButton({
  className,
  style,
  width = 20,
  onClick,
}: Props) {
  return (
    <button
      className={cx(styles.btn, styles.bg, className)}
      style={style}
      onClick={onClick}
    >
      <LeftArrowSvg width={width} theme="theme" />
    </button>
  );
}
