import styles from './beforeLogin.button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';
import EyeSvg from '@/app/_svg/input/EyeSvg';

interface Props {
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  width?: number;
  white?: boolean;
  active?: boolean;
}

export default function PasswordButton({
  className,
  style,
  onClick,
  width,
  white,
  active,
}: Props) {
  return (
    <button
      className={cx(styles.passwordBtn, className)}
      style={style}
      type="button"
      onClick={onClick}
    >
      <EyeSvg width={width} white={white} active={active} />
    </button>
  );
}
