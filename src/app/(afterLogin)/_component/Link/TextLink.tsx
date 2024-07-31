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
}

export default function TextLink({ className, style, text, href }: Props) {
  return (
    <Link
      className={cx(styles.link, styles.primaryLink, className)}
      style={style}
      href={href}
    >
      <span>{text}</span>
    </Link>
  );
}
