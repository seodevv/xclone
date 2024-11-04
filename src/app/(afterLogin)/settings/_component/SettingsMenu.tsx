'use client';

import Text from '@/app/_component/_text/Text';
import styles from './settings.menu.module.css';
import cx from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import RightUpArrowSvg from '@/app/_svg/arrow/RightUpArrowSvg';
import GreatherArrowSvg from '@/app/_svg/arrow/GreatherArrowSvg';

interface Props {
  path: string;
  text: string;
  noTarget?: boolean;
  noActive?: boolean;
  external?: boolean;
}

export default function SettingsMenu({
  path,
  text,
  noTarget = false,
  noActive = false,
  external,
}: Props) {
  const pathname = usePathname();
  const active = pathname === path;
  const width = 18.75;

  return (
    <Link
      className={cx(styles.link, active && styles.active)}
      href={path}
      target={!noTarget && external ? '_blank' : undefined}
      scroll={false}
    >
      <div className={styles.inner}>
        <Text className={styles.text} text={text} />
        {external ? (
          <RightUpArrowSvg className={styles.svg} width={width} />
        ) : (
          <GreatherArrowSvg className={styles.svg} width={width} />
        )}
      </div>
      {!noActive && active && <div className={styles.select}></div>}
    </Link>
  );
}
