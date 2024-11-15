import styles from './text.module.css';
import cx from 'classnames';
import { CSSProperties } from 'react';

interface Props {
  className?: string;
  style?: CSSProperties;
  theme?: 'theme' | 'gray' | 'primary' | 'error' | 'black' | 'green';
  size?:
    | 'xs'
    | 's'
    | 'm'
    | 'l'
    | 'xl'
    | 'xxl'
    | 'xxxl'
    | 'xxxxl'
    | 'fs_12'
    | 'fs_19'
    | 'fs_34';
  bold?: 'light' | 'normal' | 'bold' | 'boldest' | 'fw_500';
  align?: 'left' | 'center' | 'right';
  text?: string;
  display?: 'display' | 'inline-block' | 'inline';
  link?: boolean;
  pad?: boolean;
  children?: React.ReactNode;
}

export default function Text({
  className,
  style,
  theme = 'theme',
  size = 'm',
  bold = 'normal',
  align = 'left',
  text,
  display = 'display',
  link,
  pad,
  children,
}: Props) {
  return (
    <div
      className={cx(
        styles[theme],
        styles[size],
        styles[bold],
        styles[`align_${align}`],
        styles[display],
        link && styles.link,
        pad && styles.pad,
        className
      )}
      style={style}
    >
      {text}
      {children}
    </div>
  );
}
