'use client';

import styles from './link.module.css';
import { CSSProperties } from 'react';
import cx from 'classnames';
import Link from 'next/link';

interface Props {
  className?: string;
  style?: CSSProperties;
  text: string;
  href: string;
  theme?: 'theme' | 'reverse' | 'primary' | 'primary_reverse' | 'white';
  size?: 'small' | 'medium' | 'large';
  scroll?: boolean;
  inline?: boolean;
}

export default function TextLink({
  className,
  style,
  text,
  theme = 'theme',
  size = 'medium',
  href,
  scroll = false,
  inline,
}: Props) {
  return (
    <Link
      className={cx(
        styles.link,
        styles.textLink,
        styles[theme],
        styles[size],
        inline && styles.inline,
        className
      )}
      style={style}
      href={href}
      scroll={scroll}
    >
      <span>{text}</span>
    </Link>
  );
}
