'use client';

import styles from './footer.module.css';
import cx from 'classnames';
import HomeSvg from '@/app/_svg/navbar/HomeSvg';
import ExploreSvg from '@/app/_svg/navbar/ExploreSvg';
import MessageSvg from '@/app/_svg/navbar/MessageSvg';
import XLogoSvg from '@/app/_svg/logo/XLogoSvg';
import ProfileSvg from '@/app/_svg/navbar/ProfileSvg';
import { Session } from 'next-auth';
import { INavMenu } from '@/app/(afterLogin)/_component/navbar/NavMenuContainer';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavMessagesBadge from '@/app/(afterLogin)/_component/navbar/NavMessagesBadge';
import FooterButtons from '@/app/(afterLogin)/_component/_footer/FooterButtons';
import { useEffect, useRef, useState } from 'react';

interface Props {
  session: Session | null;
}

export default function LayoutFooter({ session }: Props) {
  const pathname = usePathname();
  const [scrollDir, setScrollDir] = useState<'up' | 'down' | null>(null);
  const width = 26;
  const menus: INavMenu[] = [
    {
      title: 'home',
      link: '/home',
      active: ['/home'],
      icon: <HomeSvg width={width} />,
      sessionRequired: true,
    },
    {
      title: 'explore',
      link: '/explore',
      active: ['/explore', '/search'],
      icon: <ExploreSvg width={width} />,
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
      title: 'messages',
      link: '/messages',
      active: '/messages',
      icon: <MessageSvg width={width} />,
      sessionRequired: true,
    },
    {
      title: 'profile',
      link: `/${session?.user?.email}`,
      active: `/${session?.user?.email}`,
      icon: <ProfileSvg width={width} />,
      sessionRequired: true,
    },
  ];

  const lastScrollTop = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      if (lastScrollTop.current < window.scrollY) {
        setScrollDir('down');
      } else {
        setScrollDir('up');
      }

      lastScrollTop.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (/^\/messages\/[^/]+/.test(pathname)) {
    return null;
  }

  return (
    <footer
      className={cx(styles.footer, scrollDir === 'down' && styles.opacity)}
    >
      <FooterButtons />
      <section className={styles.nav}>
        <nav className={styles.menus}>
          {menus.map((menu) => (
            <Link key={menu.title} href={menu.link} className={styles.link}>
              <div className={styles.pill}>
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
                {menu.title === 'messages' && <NavMessagesBadge />}
              </div>
            </Link>
          ))}
        </nav>
      </section>
    </footer>
  );
}
