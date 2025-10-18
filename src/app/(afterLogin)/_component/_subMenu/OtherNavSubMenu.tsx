'use client';

import styles from './otherNav.subMenu.module.css';
import SubMenu from '@/app/(afterLogin)/_component/_subMenu/SubMenu';
import SubMenuWrapper from '@/app/(afterLogin)/_component/_subMenu/SubMenuWrapper';
import { INavMenu } from '@/app/(afterLogin)/_component/navbar/NavMenuContainer';
import useViewport from '@/app/(afterLogin)/_hooks/useViewport';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import { capitalCase } from '@/app/_lib/common';
import BookmarkSvg from '@/app/_svg/actionbuttons/BookmarkSvg';
import XLogoSvg from '@/app/_svg/logo/XLogoSvg';
import BusinessSvg from '@/app/_svg/navbar/BusinessSvg';
import SettingSvg from '@/app/_svg/navbar/SettingSvg';
import ListsSvg from '@/app/_svg/post/ListsSvg';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useContext, useLayoutEffect } from 'react';

export default function OtherNavSubMenu() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { close } = useContext(SubMenuContext);
  const { width: viewWidth, height: viewHeight } = useViewport();
  const width = 26;

  const menus: INavMenu[] = [
    {
      title: 'lists',
      link: `/${session?.user?.email}/lists`,
      active: [`/${session?.user?.email}/lists`],
      icon: <ListsSvg width={width} />,
      sessionRequired: true,
    },
    {
      title: 'bookmarks',
      link: '/i/bookmarks',
      active: ['/i/bookmarks'],
      icon: <BookmarkSvg width={width} />,
      sessionRequired: true,
    },
    {
      title: 'premium',
      link: '/i/premium_sign_up',
      active: ['/i/premium_sign_up'],
      icon: <XLogoSvg width={width} />,
      sessionRequired: true,
    },
    {
      title: 'business',
      link: '/i/verified-orgs-signup',
      active: ['/i/verified-orgs-signup'],
      icon: <BusinessSvg width={width} />,
      sessionRequired: true,
    },
    {
      title: 'settings',
      link: '/settings',
      active: '/settings',
      icon: <SettingSvg width={width} />,
      sessionRequired: false,
    },
  ];

  useLayoutEffect(() => {
    if ((viewWidth && viewWidth <= 500) || (viewHeight && viewHeight <= 500)) {
      close();
    }
  }, [viewWidth, viewHeight]);

  return (
    <SubMenuWrapper position="middle-right" nav>
      {menus.map((menu) => (
        <SubMenu
          key={menu.title}
          className={styles[menu.title]}
          type="link"
          href={menu.link}
          title={
            menu.title === 'settings'
              ? 'Settings and privacy'
              : capitalCase(menu.title)
          }
          svg={
            <menu.icon.type
              {...menu.icon.props}
              active={
                Array.isArray(menu.active)
                  ? menu.active.includes(pathname)
                  : typeof menu.active === 'string'
                  ? pathname.startsWith(menu.active)
                  : false
              }
              theme="theme"
            />
          }
          onClick={close}
          nav
          inActive={!session && menu.sessionRequired}
        />
      ))}
    </SubMenuWrapper>
  );
}
