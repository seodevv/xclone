'use client';

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import TabButton from '@/app/(afterLogin)/_component/tab/TabButton';
import Text from '@/app/_component/_text/Text';
import { useContext } from 'react';
import SearchResult from '@/app/(afterLogin)/messages/_component/_body/_search/SearchResult';
import { MessagesSearchContext } from '@/app/(afterLogin)/messages/_component/_body/_search/_provider/MessagesSearchProvider';

export type MessageSearchTab = 'all' | 'people' | 'groups' | 'messages';

interface Props {
  sessionid: string;
}

export default function MessagesSearchBody({ sessionid }: Props) {
  const { active, input, tab, set } = useContext(MessagesSearchContext);
  const tabs: MessageSearchTab[] = ['all', 'people', 'groups', 'messages'];

  if (!active) return null;

  if (!input) {
    return <NoInput />;
  }

  return (
    <>
      <nav
        className={cx(
          utils.d_flexRow,
          utils.flexNoWrap,
          utils.flex_alignStretch,
          utils.h_53,
          utils.bd_b_1_solid_gray,
          utils.fs_m
        )}
      >
        {tabs.map((t) => (
          <TabButton
            key={t}
            onClick={() => set({ tab: t })}
            text={t}
            active={t === tab}
          />
        ))}
      </nav>
      <SearchResult sessionid={sessionid} />
    </>
  );
}

function NoInput() {
  return (
    <div
      className={cx(
        utils.mt_32,
        utils.d_flexRow,
        utils.flex_alignCenter,
        utils.flex_justiCenter
      )}
    >
      <Text theme="gray" size="s">
        Try searching for people, groups, or messages
      </Text>
    </div>
  );
}
