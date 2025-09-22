import styles from './button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';

interface Props {
  className?: string;
  style?: CSSProperties;
  svg: JSX.Element;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function CustomButton({
  className,
  style,
  svg,
  disabled,
  onClick,
}: Props) {
  return (
    <button
      className={cx(styles.btn, className)}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      <svg.type {...svg.props} />
    </button>
  );
}
