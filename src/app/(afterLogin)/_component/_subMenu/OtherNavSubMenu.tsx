'use client';

import styles from './otherNav.subMenu.module.css';
import SubMenu from '@/app/(afterLogin)/_component/_subMenu/SubMenu';
import SubMenuWrapper from '@/app/(afterLogin)/_component/_subMenu/SubMenuWrapper';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import BookmarkSvg from '@/app/_svg/actionbuttons/BookmarkSvg';
import XLogoSvg from '@/app/_svg/logo/XLogoSvg';
import SettingSvg from '@/app/_svg/navbar/SettingSvg';
import ListsSvg from '@/app/_svg/post/ListsSvg';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';

export default function OtherNavSubMenu() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { close } = useContext(SubMenuContext);
  const width = 26;

  return (
    <SubMenuWrapper position="top-right" nav>
      <SubMenu
        className={styles.lists}
        type="link"
        href={`/${session?.user?.email}/lists`}
        title="Lists"
        svg={
          <ListsSvg
            width={width}
            active={pathname.startsWith(`/${session?.user?.email}/lists`)}
          />
        }
        onClick={() => close()}
        nav
      />
      <SubMenu
        className={styles.premium}
        type="link"
        href="/i/premium_sign_up"
        title="Premium"
        svg={<XLogoSvg width={width} />}
        onClick={() => close()}
        scroll={false}
        nav
      />

      <SubMenu
        className={styles.bookmarks}
        type="link"
        href="/i/bookmarks"
        title="Bookmarks"
        svg={
          <BookmarkSvg
            width={width}
            active={pathname.startsWith('/i/bookmarks')}
          />
        }
        onClick={() => close()}
        nav
      />
      <SubMenu
        type="link"
        href="/settings"
        title="Settings and privacy"
        svg={
          <SettingSvg width={width} active={pathname.startsWith('/settings')} />
        }
        onClick={() => close()}
        nav
      />
    </SubMenuWrapper>
  );
}
