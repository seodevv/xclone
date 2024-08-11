import styles from './button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';
import MessageSvg from '@/app/_svg/navbar/MessageSvg';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function MessageButton({
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
      <MessageSvg width={width} white />
    </button>
  );
}
