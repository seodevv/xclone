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
  type?: 'temporary' | 'primary';
}

export default function TextLink({
  className,
  style,
  text,
  type = 'primary',
  href,
}: Props) {
  return (
    <Link
      className={cx(
        styles.link,
        styles.textLink,
        type === 'temporary' && styles.temporaryLink,
        type === 'primary' && styles.primaryLink,
        className
      )}
      style={style}
      href={href}
    >
      <span>{text}</span>
    </Link>
  );
}
