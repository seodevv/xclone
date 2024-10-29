'use client';

import TabLink from '@/app/(afterLogin)/_component/tab/TabLink';
import useListsStore from '@/app/(afterLogin)/_store/ListsStore';
import { captialCase } from '@/app/_lib/common';
import { usePathname } from 'next/navigation';

interface Props {
  listid: string;
}

export default function ListsMembersTab({ listid }: Props) {
  const suggested = useListsStore((state) => state.suggested);
  const pathname = usePathname();

  const tabs = [
    { id: 'members', link: `/i/lists/${listid}/members` },
    { id: 'suggested', link: `/i/lists/${listid}/members/suggested` },
  ];

  if (!suggested) return null;

  return (
    <div style={{ display: 'flex' }}>
      {tabs.map((tab) => (
        <TabLink
          key={tab.id}
          text={captialCase(tab.id)}
          href={tab.link}
          active={pathname === tab.link}
        />
      ))}
    </div>
  );
}
