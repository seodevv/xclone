'use client';

import TabLink from '@/app/(afterLogin)/_component/tab/TabLink';
import { captialCase } from '@/app/_lib/common';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import { useSelectedLayoutSegment } from 'next/navigation';

interface Props {
  username: string;
}

export default function UserTopicsTabs({ username }: Props) {
  const segment = useSelectedLayoutSegment();
  const tabs = [
    { link: 'followed' },
    { link: 'not_interested', text: 'not_interested' },
  ];

  return (
    <nav className={cx(utils.d_flexRow, utils.bd_b_1_solid_gray)}>
      {tabs.map((tab) => {
        const active = segment === tab.link;
        return (
          <TabLink
            key={tab.link}
            href={`/${username}/topics/${tab.link}`}
            text={tab.text ? captialCase(tab.text) : captialCase(tab.link)}
            active={tab.link === 'followed' ? active || !segment : active}
          />
        );
      })}
    </nav>
  );
}
