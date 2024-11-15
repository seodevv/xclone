'use client';

import style from '../_style/usertabs.module.css';
import { Session } from 'next-auth';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useUserQuery } from '../_hooks/useUserQuery';
import TabLink from '../../_component/tab/TabLink';

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

  const followTabs = [
    { text: 'Verified Followers', segment: 'verified_followers' },
    { text: 'Followers', segment: 'followers' },
    { text: 'Following', segment: 'following' },
  ];
  const userTabs = [
    { text: 'Posts', segment: '' },
    { text: 'Replies', segment: 'with_replies' },
    { text: 'Media', segment: 'media' },
  ];
  const likeTab = { text: 'Likes', segment: 'likes' };

  if (
    segment === 'status' ||
    segment === 'lists' ||
    segment === 'topics' ||
    !user
  ) {
    return null;
  }

  return (
    <>
      <nav className={style.userTabs}>
        {isFollow ? (
          <>
            {followTabs.map((f) => (
              <TabLink
                key={f.segment}
                href={`/${user?.data.id}/${f.segment}`}
                text={f.text}
                active={segment === f.segment}
              />
            ))}
          </>
        ) : (
          <>
            {userTabs.map((f) => (
              <TabLink
                key={f.segment}
                href={`/${user?.data.id}/${f.segment}`}
                text={f.text}
                active={segment === (f.segment ? f.segment : null)}
              />
            ))}
            {username === session?.user?.email && (
              <TabLink
                href={`/${user?.data.id}/${likeTab.segment}`}
                text={likeTab.text}
                active={segment === likeTab.segment}
              />
            )}
          </>
        )}
      </nav>
    </>
  );
}
