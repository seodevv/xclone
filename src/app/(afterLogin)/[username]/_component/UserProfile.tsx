'use client';

import style from '@/app/(afterLogin)/[username]/_style/profile.module.css';
import { MouseEventHandler } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Session } from 'next-auth';
import { useUserQuery } from '../_hooks/useUserQuery';
import { generateImagePath } from '@/app/_lib/common';
import CalendarSvg from '@/app/_svg/profile/CalendarSvg';
import ReferenceSvg from '@/app/_svg/profile/ReferenceSvg';

interface Props {
  session: Session | null;
  username: string;
}

export default function UserProfile({ session, username }: Props) {
  const segment = useSelectedLayoutSegment();
  const { data: user } = useUserQuery(username);

  const onClickFollow: MouseEventHandler<HTMLButtonElement> = (e) => {};

  if (
    segment &&
    ['verified_followers', 'followers', 'following', 'status'].includes(segment)
  ) {
    return null;
  }

  return (
    <>
      <div className={style.banner}>
        {user && user.data.banner && (
          <Image
            src={generateImagePath(user.data.banner)}
            alt=""
            width={600}
            height={200}
            className={style.bannerImage}
          />
        )}
      </div>
      <div className={style.userZone}>
        <div className={style.userImage}>
          <div className={style.imageBox}>
            {user && (
              <Image
                src={generateImagePath(user.data.image)}
                alt={user.data.id}
                width={145}
                height={145}
              />
            )}
          </div>
          {user && user.data.id !== session?.user?.email && (
            <button className={style.followButton} onClick={onClickFollow}>
              팔로우
            </button>
          )}
        </div>
        <div className={style.userName}>
          <div>
            <div className={style.userNick}>
              {user ? user.data.nickname : '@' + username}
            </div>
            {user && <div className={style.userId}>@{user.data.id}</div>}
          </div>
          {user ? (
            <>
              {user.data.desc && (
                <div className={style.userDesc}>
                  {user.data.desc.split(/\r\n|\r|\n/).map((t, i) => (
                    <span key={i}>{t}</span>
                  ))}
                </div>
              )}

              <div className={style.userExtra}>
                {user.data.refer && (
                  <Link
                    href={user.data.refer}
                    target="_blank"
                    className={style.userRefer}
                  >
                    <ReferenceSvg className={style.refer} />
                    <span>{user.data.refer}</span>
                  </Link>
                )}
                <span className={style.registDate}>
                  <CalendarSvg className={style.calendar} />
                  <span>
                    가입일: {new Date(user.data.regist).getFullYear()}년{' '}
                    {new Date(user.data.regist).getMonth()}월
                  </span>
                </span>
              </div>
              <div className={style.userFollowInfo}>
                <div className={style.userFollow}>
                  <Link href={`/${user.data.id}/following`}>
                    <span className={style.number}>
                      {user.data._count.Followings}
                    </span>
                    <span className={style.text}>Following</span>
                  </Link>
                </div>
                <div className={style.userFollow}>
                  <Link href={`/${user.data.id}/verified_followers`}>
                    <span className={style.number}>
                      {user.data._count.Followers}
                    </span>
                    <span className={style.text}>Follower</span>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className={style.userNotFound}>
              <div>This account doesn't exist</div>
              <div>Try searching for another.</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
