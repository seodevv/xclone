import styles from './button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';
import CheckSvg from '@/app/_svg/input/CheckSvg';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isChecked?: boolean;
}

export default function RadioButton({
  className,
  style,
  width = 16,
  onClick,
  isChecked,
}: Props) {
  return (
    <button
      className={cx(styles.RadioBtn, isChecked && styles.active, className)}
      style={style}
      onClick={onClick}
    >
      {isChecked && <CheckSvg width={width} theme="theme" />}
    </button>
  );
}
