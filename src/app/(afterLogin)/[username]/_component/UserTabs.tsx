'use client';

import style from '../_style/usertabs.module.css';
import { Session } from 'next-auth';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import cx from 'classnames';
import { useUserQuery } from '../_hooks/useUserQuery';

interface Props {
  session: Session | null;
  username: string;
}

export default function UserTabs({ session, username }: Props) {
  const segment = useSelectedLayoutSegment();
  const { data: user } = useUserQuery(username);
  const isFollow =
    segment &&
    ['verified_followers', 'followers', 'following'].includes(segment);

  if (segment === 'status') {
    return null;
  }

  return (
    <>
      <nav className={style.userTabs}>
        {isFollow ? (
          <>
            <div className={style.userTab}>
              <Link
                href={`/${user?.data.id}/verified_followers`}
                className={cx(
                  style.userTabLink,
                  segment === 'verified_followers' && style.linkActive
                )}
              >
                <div>Verified Followers</div>
                <div className={style.userTabActive}></div>
              </Link>
            </div>
            <div className={style.userTab}>
              <Link
                href={`/${user?.data.id}/followers`}
                className={cx(
                  style.userTabLink,
                  segment === 'followers' && style.linkActive
                )}
              >
                <div>Followers</div>
                <div className={style.userTabActive}></div>
              </Link>
            </div>
            <div className={style.userTab}>
              <Link
                href={`/${user?.data.id}/following`}
                className={cx(
                  style.userTabLink,
                  segment === 'following' && style.linkActive
                )}
              >
                <div>Following</div>
                <div className={style.userTabActive}></div>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className={style.userTab}>
              <Link
                href={`/${user?.data.id}`}
                className={cx(
                  style.userTabLink,
                  segment === null && style.linkActive
                )}
              >
                <div>Posts</div>
                <div className={style.userTabActive}></div>
              </Link>
            </div>
            <div className={style.userTab}>
              <Link
                href={`/${user?.data.id}/with_replies`}
                className={cx(
                  style.userTabLink,
                  segment === 'with_replies' && style.linkActive
                )}
              >
                <div>Replies</div>
                <div className={style.userTabActive}></div>
              </Link>
            </div>
            <div className={style.userTab}>
              <Link
                href={`/${user?.data.id}/media`}
                className={cx(
                  style.userTabLink,
                  segment === 'media' && style.linkActive
                )}
              >
                <div>Media</div>
                <div className={style.userTabActive}></div>
              </Link>
            </div>
            {username === session?.user?.email && (
              <div className={style.userTab}>
                <Link
                  href={`/${user?.data.id}/likes`}
                  className={cx(
                    style.userTabLink,
                    segment === 'likes' && style.linkActive
                  )}
                >
                  <div>Likes</div>
                  <div className={style.userTabActive}></div>
                </Link>
              </div>
            )}
          </>
        )}
      </nav>
    </>
  );
}
