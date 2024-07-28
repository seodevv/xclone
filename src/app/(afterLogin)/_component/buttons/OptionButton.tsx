import styles from './button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';
import OptionSvg from '@/app/_svg/post/OptionSvg';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  white?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export default function OptionButton({
  className,
  style,
  width = 20,
  white,
  onClick,
  disabled,
}: Props) {
  return (
    <button
      className={cx(styles.btn, className)}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      <OptionSvg width={width} white={white} />
    </button>
  );
}
