import styles from './button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';
import OptionSvg from '@/app/_svg/post/OptionSvg';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export default function OptionButton({
  className,
  style,
  width = 20,
  onClick,
  disabled,
}: Props) {
  return (
    <button
      className={cx(styles.btn, styles.optionBtn, className)}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      <OptionSvg width={width} />
    </button>
  );
}
