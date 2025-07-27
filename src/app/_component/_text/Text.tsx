import styles from './text.module.css';
import cx from 'classnames';
import { CSSProperties } from 'react';

interface Props {
  className?: string;
  style?: CSSProperties;
  theme?: 'theme' | 'gray' | 'primary' | 'error' | 'black' | 'green' | 'pink';
  size?:
    | 'xs'
    | 's'
    | 'm'
    | 'l'
    | 'xl'
    | 'xxl'
    | 'xxxl'
    | 'xxxxl'
    | 'fs_11'
    | 'fs_12'
    | 'fs_19'
    | 'fs_29'
    | 'fs_34'
    | 'fs_37';
  bold?: 'light' | 'normal' | 'bold' | 'boldest' | 'fw_500';
  align?: 'left' | 'center' | 'right';
  wordBreak?: 'break-all' | 'keep-all' | 'normal';
  wordWrap?: 'break-word' | 'normal';
  whiteSpace?: 'nowrap' | 'normal';
  overflow?: 'clip' | 'ellipsis';
  text?: string;
  display?: 'display' | 'inline-block' | 'inline';
  hover?: 'underline' | 'none';
  link?: boolean;
  pad?: boolean;
  of?: 'auto' | 'hide';
  children?: React.ReactNode;
}

export default function Text({
  className,
  style,
  theme = 'theme',
  size = 'm',
  bold = 'normal',
  align = 'left',
  wordBreak = 'keep-all',
  wordWrap = 'break-word',
  whiteSpace = 'normal',
  overflow = 'clip',
  text,
  display = 'display',
  hover = 'none',
  link,
  pad,
  of = 'hide',
  children,
}: Props) {
  return (
    <div
      className={cx(
        styles[theme],
        styles[size],
        styles[bold],
        styles[`align_${align}`],
        styles[`wordBreak_${wordBreak}`],
        styles[`wordWrap_${wordWrap}`],
        styles[`whiteSpace_${whiteSpace}`],
        styles[`textOf_${overflow}`],
        styles[`of_${of}`],
        styles[display],
        hover !== 'none' && styles[`hover_${hover}`],
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
