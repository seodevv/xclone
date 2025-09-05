import styles from './link.module.css';
import cx from 'classnames';
import SettingSvg from '@/app/_svg/navbar/SettingSvg';
import Link from 'next/link';
import { CSSProperties } from 'react';

interface Props {
  className?: string;
  style?: CSSProperties;
  href: string;
  width?: number;
}

export default function SettingsLink({
  className,
  style,
  href,
  width = 20,
}: Props) {
  return (
    <Link
      className={cx(styles.link, styles.settingsLink, className)}
      style={style}
      href={href}
    >
      <SettingSvg width={width} theme="theme" />
    </Link>
  );
}
