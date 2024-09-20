import styles from './text.module.css';
import cx from 'classnames';
import { CSSProperties } from 'react';

interface Props {
  className?: string;
  style?: CSSProperties;
  theme?: 'theme' | 'gray' | 'primary' | 'error';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  bold?: 'light' | 'normal' | 'bold' | 'boldest';
  text?: string;
  display?: 'display' | 'inline-block' | 'inline';
  children?: React.ReactNode;
}

export default function Text({
  className,
  style,
  theme = 'theme',
  size = 'm',
  bold = 'normal',
  text,
  display = 'display',
  children,
}: Props) {
  return (
    <div
      className={cx(
        styles[theme],
        styles[size],
        styles[bold],
        styles[display],
        className
      )}
      style={style}
    >
      {text}
      {children}
    </div>
  );
}
