import styles from './beforeLogin.button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';
import EyeSvg from '@/app/_svg/input/EyeSvg';
import { SvgTheme } from '@/app/_svg/Svg';

interface Props {
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  width?: number;
  active?: boolean;
  theme?: SvgTheme;
}

export default function PasswordButton({
  className,
  style,
  onClick,
  width,
  active,
  theme,
}: Props) {
  return (
    <button
      className={cx(styles.passwordBtn, className)}
      style={style}
      type="button"
      onClick={onClick}
    >
      <EyeSvg width={width} active={active} theme={theme} />
    </button>
  );
}
