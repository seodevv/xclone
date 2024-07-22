'use client';

import style from './navMenu.module.css';
import { useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';
import { Session } from 'next-auth';
import HomeSvg from '@/app/_svg/navbar/HomeSvg';
import ExploreSvg from '@/app/_svg/navbar/ExploreSvg';
import MessageSvg from '@/app/_svg/navbar/MessageSvg';
import ProfileSvg from '@/app/_svg/navbar/ProfileSvg';
import SettingSvg from '@/app/_svg/navbar/SettingSvg';
import TweetSvg from '@/app/_svg/navbar/TweetSvg';

interface Props {
  session: Session | null;
}

export default function NavMenu({ session }: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <nav>
      <ul>
        {session && session.user && (
          <>
            <li>
              <Link href="/home">
                <div className={style.navPill}>
                  <HomeSvg active={segment === 'home'} />
                  <div className={segment === 'home' ? style.activeBold : ''}>
                    Home
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/explore">
                <div className={style.navPill}>
                  <ExploreSvg
                    active={segment === 'search' || segment === 'explore'}
                  />
                  <div
                    className={
                      segment === 'search' || segment === 'explore'
                        ? style.activeBold
                        : ''
                    }
                  >
                    Explore
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/messages">
                <div className={style.navPill}>
                  <MessageSvg active={segment === 'messages'} />
                  <div
                    className={segment === 'messages' ? style.activeBold : ''}
                  >
                    Messages
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link href={`/${session.user.email}`}>
                <div className={style.navPill}>
                  <ProfileSvg active={segment === session.user.email} />
                  <div
                    className={
                      segment === session.user.email ? style.activeBold : ''
                    }
                  >
                    Profile
                  </div>
                </div>
              </Link>
            </li>
          </>
        )}
        <li>
          <Link href={`/settings`}>
            <div className={style.navPill}>
              <SettingSvg active={segment === 'settings'} />
              <div className={segment === 'settings' ? style.activeBold : ''}>
                Settings
              </div>
            </div>
          </Link>
        </li>
      </ul>
      {session && (
        <Link href="/compose/tweet" className={style.tweet}>
          <span>게시하기</span>
          <TweetSvg white />
        </Link>
      )}
    </nav>
  );
}
