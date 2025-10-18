'use client';

import styles from './navMenu.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import Link from 'next/link';
import { INavMenu } from '@/app/(afterLogin)/_component/navbar/NavMenuContainer';
import NavMessagesBadge from '@/app/(afterLogin)/_component/navbar/NavMessagesBadge';
import { usePathname } from 'next/navigation';
import { capitalCase } from '@/app/_lib/common';
import { CSSProperties } from 'react';

interface Props {
  menu: INavMenu;
  style?: CSSProperties;
}

export default function NavMenu({ menu, style }: Props) {
  const pathname = usePathname();
  const active = Array.isArray(menu.active)
    ? menu.active.includes(pathname)
    : typeof menu.active === 'string'
    ? pathname.startsWith(menu.active)
    : false;

  return (
    <li
      key={menu.link}
      className={cx(styles.navList, styles[menu.title])}
      style={style}
    >
      <Link className={utils.relative} href={menu.link} scroll={false}>
        <div className={styles.navPill}>
          <div
            className={cx(
              utils.relative,
              utils.d_flexRow,
              utils.flex_alignCenter
            )}
          >
            <menu.icon.type
              {...menu.icon.props}
              active={active}
              theme="theme"
            />
            {menu.title === 'messages' && <NavMessagesBadge />}
          </div>
          <div className={cx(styles.navTitle, active && styles.bold)}>
            {capitalCase(menu.title)}
          </div>
        </div>
      </Link>
    </li>
  );
}
