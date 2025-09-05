import styles from './text.module.css';
import cx from 'classnames';
import { CSSProperties } from 'react';

export type TextTheme =
  | 'theme'
  | 'reverse'
  | 'gray'
  | 'primary'
  | 'error'
  | 'black'
  | 'green'
  | 'pink';

export type TextBold = 'light' | 'normal' | 'bold' | 'boldest' | 'fw_500';

interface Props {
  className?: string;
  style?: CSSProperties;
  theme?: TextTheme;
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
  bold?: TextBold;
  align?: 'left' | 'center' | 'right';
  wordBreak?: 'break-all' | 'keep-all' | 'normal';
  wordWrap?: 'break-word' | 'normal';
  whiteSpace?: 'nowrap' | 'normal';
  overflow?: 'clip' | 'ellipsis';
  text?: string;
  display?: 'block' | 'inline-block' | 'inline' | 'flex';
  hover?: 'underline' | 'none';
  link?: boolean;
  pad?: boolean;
  of?: 'auto' | 'hide';
  highlight?: boolean;
  onClick?: () => void;
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
  display = 'block',
  hover = 'none',
  link,
  pad,
  of = 'hide',
  highlight,
  onClick,
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
        highlight && styles.highlight,
        className
      )}
      style={style}
      onClick={onClick}
    >
      {text}
      {children}
    </div>
  );
}
