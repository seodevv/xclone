'use client';

import TabLink from '@/app/(afterLogin)/_component/tab/TabLink';
import { captialCase } from '@/app/_lib/common';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function SettingsBlockedTabs() {
  const segment = useSelectedLayoutSegment();
  const tabs = [{ link: 'all' }, { link: 'imported' }];

  return (
    <nav className={cx(utils.d_flexRow, utils.bd_b_1_solid_gray)}>
      {tabs.map((tab) => (
        <TabLink
          key={tab.link}
          href={`/settings/blocked/${tab.link}`}
          text={captialCase(tab.link)}
          active={segment === tab.link}
        />
      ))}
    </nav>
  );
}
