import styles from './button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';
import SettingSvg from '@/app/_svg/navbar/SettingSvg';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function SettingButton({
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
      <SettingSvg width={width} theme="theme" />
    </button>
  );
}
