import styles from './button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';
import OptionSvg from '@/app/_svg/post/OptionSvg';
import { SvgTheme } from '@/app/_svg/Svg';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  theme?: SvgTheme;
  primary?: boolean;
}

export default function OptionButton({
  className,
  style,
  width = 20,
  onClick,
  disabled,
  theme = 'default',
  primary = true,
}: Props) {
  return (
    <button
      className={cx(styles.btn, primary && styles.optionBtn, className)}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      <OptionSvg width={width} theme={theme} />
    </button>
  );
}
