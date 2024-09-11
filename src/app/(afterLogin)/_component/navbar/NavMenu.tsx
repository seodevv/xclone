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
import useComposeStore from '@/app/(afterLogin)/_store/ComposeStore';
import ListsSvg from '@/app/_svg/post/ListsSvg';

interface Menu {
  title:
    | 'home'
    | 'explore'
    | 'messages'
    | 'lists'
    | 'bookmarks'
    | 'profile'
    | 'settings';
  link: string;
  active: string[];
  icon: JSX.Element;
  sessionRequired: boolean;
}

interface Props {
  session: Session | null;
}

export default function NavMenu({ session }: Props) {
  const pathname = usePathname();
  const reset = useComposeStore((state) => state.reset);
  const width = 26;
  const menus: Menu[] = [
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
      title: 'messages',
      link: '/messages',
      active: ['/messages'],
      icon: <MessageSvg width={width} />,
      sessionRequired: true,
    },
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
      title: 'profile',
      link: `/${session?.user?.email}`,
      active: [`/${session?.user?.email}`],
      icon: <ProfileSvg width={width} />,
      sessionRequired: true,
    },
    {
      title: 'settings',
      link: '/settings',
      active: ['/settings'],
      icon: <SettingSvg width={width} />,
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
          return (
            <li key={menu.link}>
              <Link href={menu.link}>
                <div className={styles.navPill}>
                  <menu.icon.type {...menu.icon.props} active={active} white />
                  <div className={cx(styles.navTitle, active && styles.bold)}>
                    {captialCase(menu.title)}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      {session && (
        <Link
          href="/compose/post"
          className={styles.tweet}
          scroll={false}
          onClick={() => reset()}
        >
          <span className={styles.post}>Post</span>
          <TweetSvg white />
        </Link>
      )}
    </nav>
  );
}
