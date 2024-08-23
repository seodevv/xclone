'use client';

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import TabLink from '@/app/(afterLogin)/_component/tab/TabLink';
import { captialCase } from '@/app/_lib/common';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Session } from 'next-auth';

interface Props {
  session: Session | null;
  username: string;
}

export default function ViewTabs({ session, username }: Props) {
  const [, , segment] = useSelectedLayoutSegments();
  if (!['quotes', 'retweets', 'likes'].includes(segment)) return null;

  const tabs = [{ link: 'quotes' }, { link: 'retweets', text: 'reposts' }];

  return (
    <nav className={cx(utils.d_flexRow, utils.bd_b_1_solid_gray)}>
      {tabs.map((tab) => (
        <TabLink
          key={tab.link}
          href={tab.link}
          text={tab.text ? captialCase(tab.text) : captialCase(tab.link)}
          active={segment === tab.link}
        />
      ))}
      {session?.user?.email === username && (
        <TabLink href="likes" text="Likes" active={segment === 'likes'} />
      )}
    </nav>
  );
}
