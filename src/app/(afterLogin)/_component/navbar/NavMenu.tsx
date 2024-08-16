'use client';

import styles from './navMenu.module.css';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';
import { Session } from 'next-auth';
import HomeSvg from '@/app/_svg/navbar/HomeSvg';
import ExploreSvg from '@/app/_svg/navbar/ExploreSvg';
import MessageSvg from '@/app/_svg/navbar/MessageSvg';
import ProfileSvg from '@/app/_svg/navbar/ProfileSvg';
import SettingSvg from '@/app/_svg/navbar/SettingSvg';
import TweetSvg from '@/app/_svg/navbar/TweetSvg';
import cx from 'classnames';
import { captialCase } from '@/app/_lib/common';
import BookmarkSvg from '@/app/_svg/actionbuttons/BookmarkSvg';

interface Props {
  session: Session | null;
}

export default function NavMenu({ session }: Props) {
  const pathname = usePathname();

  const menus = [
    {
      link: 'home',
      active: ['/home'],
      icon: <HomeSvg />,
      sessionRequired: true,
    },
    {
      link: 'explore',
      active: ['/explore', '/search'],
      icon: <ExploreSvg />,
      sessionRequired: true,
    },
    {
      link: 'messages',
      active: ['/messages'],
      icon: <MessageSvg />,
      sessionRequired: true,
    },
    {
      link: 'bookmarks',
      active: ['/i/bookmarks'],
      icon: <BookmarkSvg width={26} />,
      sessionRequired: true,
    },
    {
      link: 'profile',
      active: [`/${session?.user?.email}`],
      icon: <ProfileSvg />,
      sessionRequired: true,
    },
    {
      link: 'settings',
      active: ['/settings'],
      icon: <SettingSvg />,
      sessionRequired: false,
    },
  ];

  return (
    <nav>
      <ul>
        {menus.map((menu) => {
          if (!session && menu.sessionRequired) {
            return null;
          }
          const active = menu.active.includes(pathname);
          const link =
            menu.link === 'profile'
              ? `/${session?.user?.email}`
              : menu.link === 'bookmarks'
              ? '/i/bookmarks'
              : `/${menu.link}`;
          return (
            <li key={menu.link}>
              <Link href={link}>
                <div className={styles.navPill}>
                  <menu.icon.type {...menu.icon.props} active={active} white />
                  <div className={cx(styles.navTitle, active && styles.bold)}>
                    {captialCase(menu.link)}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      {session && (
        <Link href="/compose/post" className={styles.tweet} scroll={false}>
          <span className={styles.post}>Post</span>
          <TweetSvg white />
        </Link>
      )}
    </nav>
  );
}
