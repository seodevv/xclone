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
  theme?: 'theme' | 'reverse' | 'primary' | 'primary_reverse';
  size?: 'small' | 'medium' | 'large';
}

export default function TextLink({
  className,
  style,
  text,
  theme = 'theme',
  size = 'medium',
  href,
}: Props) {
  return (
    <Link
      className={cx(
        styles.link,
        styles.textLink,
        styles[theme],
        styles[size],
        className
      )}
      style={style}
      href={href}
    >
      <span>{text}</span>
    </Link>
  );
}
