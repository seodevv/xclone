'use client';

import styles from './mobile.nav.module.css';
import utils from '@/app/utility.module.css';
import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import { useUserQuery } from '@/app/(afterLogin)/[username]/_hooks/useUserQuery';
import MyProfile from '@/app/(afterLogin)/_component/profile/MyProfile';
import useMobileNavStore from '@/app/(afterLogin)/_store/MbileNavStore';
import Link from 'next/link';
import Text from '@/app/_component/_text/Text';
import UserFollowInfo from '@/app/(afterLogin)/[username]/_component/_profile/UserFollowInfo';
import { INavMenu } from '@/app/(afterLogin)/_component/navbar/NavMenuContainer';
import HomeSvg from '@/app/_svg/navbar/HomeSvg';
import ExploreSvg from '@/app/_svg/navbar/ExploreSvg';
import MessageSvg from '@/app/_svg/navbar/MessageSvg';
import ListsSvg from '@/app/_svg/post/ListsSvg';
import BookmarkSvg from '@/app/_svg/actionbuttons/BookmarkSvg';
import XLogoSvg from '@/app/_svg/logo/XLogoSvg';
import BusinessSvg from '@/app/_svg/navbar/BusinessSvg';
import ProfileSvg from '@/app/_svg/navbar/ProfileSvg';
import { usePathname } from 'next/navigation';
import LogoutSvg from '@/app/_svg/navbar/LogoutSvg';
import { MouseEventHandler } from 'react';
import useConfirmStore, {
  confirmSelector,
} from '@/app/(afterLogin)/_store/ConfirmStore';
import { signOut } from 'next-auth/react';
import SettingSvg from '@/app/_svg/navbar/SettingSvg';

interface Props {
  sessionid: string;
}

export default function MobileNav({ sessionid }: Props) {
  const pathname = usePathname();
  const { flag, close } = useMobileNavStore();
  const { data: user } = useUserQuery(sessionid);
  const width = 24;
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
      title: 'messages',
      link: '/messages',
      active: '/messages',
      icon: <MessageSvg width={width} />,
      sessionRequired: true,
    },
    {
      title: 'lists',
      link: `/${sessionid}/lists`,
      active: [`/${sessionid}/lists`],
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
      title: 'profile',
      link: `/${sessionid}`,
      active: `/${sessionid}`,
      icon: <ProfileSvg width={width} />,
      sessionRequired: true,
    },
    {
      title: 'settings',
      link: '/settings',
      active: '/settings',
      icon: <SettingSvg width={width} />,
      sessionRequired: true,
    },
  ];

  const { open, close: closeConfirm } = useConfirmStore(confirmSelector);
  const onClickLogout: MouseEventHandler<HTMLDivElement> = async () => {
    open({
      flag: true,
      x: true,
      title: 'Log out of X?',
      sub: 'You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account.',
      btnText: 'Log out',
      btnTheme: 'theme',
      onClickCancle: () => {
        closeConfirm();
      },
      onClickConfirm: async () => {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
            method: 'post',
            credentials: 'include',
          });
          await signOut({ redirect: true, callbackUrl: '/' });
        } catch (error) {
          console.error(error);
        }
      },
    });
    close();
  };

  if (!flag) return null;

  return (
    <IBackground size="none" onClick={close}>
      <div className={styles.slide}>
        <div className={styles.scroll}>
          <div className={styles.profile}>
            <MyProfile width={40} height={40} />
            <div className={utils.mt_8}>
              <Link href={`/${user?.data.id}`}>
                <Text theme="theme" size="l" bold="bold">
                  {user?.data.id}
                </Text>
                <Text theme="gray" size="m" bold="normal">
                  @{user?.data.nickname}
                </Text>
              </Link>
            </div>
            <div className={utils.mt_12}>
              <UserFollowInfo user={user?.data} afterLink={close} />
            </div>
          </div>
          {menus.map((menu) => (
            <Link
              key={menu.title}
              href={menu.link}
              className={styles.menu}
              onClick={close}
            >
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
              <Text theme="theme" size="xl" bold="bold">
                {menu.title}
              </Text>
            </Link>
          ))}
          <div className={styles.menu} onClick={onClickLogout}>
            <LogoutSvg width={width} theme="theme" />
            <Text theme="theme" size="xl" bold="bold">
              Log out
            </Text>
          </div>
        </div>
      </div>
    </IBackground>
  );
}
