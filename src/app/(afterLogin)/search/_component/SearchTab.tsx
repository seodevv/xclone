'use client';

import style from '../_style/search.module.css';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TabButton from '../../_component/tab/TabButton';

type Tab = 'top' | 'live' | 'user' | 'media' | 'lists';

const isTab = (str: string | null): Tab => {
  if (str === 'live') return 'live';
  if (str === 'user') return 'user';
  if (str === 'media') return 'media';
  if (str === 'lists') return 'lists';
  return 'top';
};

export default function SearchTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const f = searchParams.get('f');
  const [tab, setTab] = useState<Tab>(f ? isTab(f) : 'top');
  const tabs: { text?: string; f: Tab }[] = [
    { f: 'top' },
    { text: 'latest', f: 'live' },
    { text: 'people', f: 'user' },
    { f: 'media' },
    { f: 'lists' },
  ];

  const changeTabs = (tab: Tab) => {
    const writableSearchParams = new URLSearchParams(searchParams);
    if (tab === 'top') {
      writableSearchParams.delete('f');
    } else {
      writableSearchParams.set('f', tab);
    }
    setTab(tab);
    router.replace(`/search?${writableSearchParams.toString()}`);
  };

  useEffect(() => {
    setTab(f ? isTab(f) : 'top');
  }, [searchParams]);

  return (
    <nav className={style.tabs}>
      {tabs.map((t) => (
        <TabButton
          key={t.f}
          onClick={() => changeTabs(t.f)}
          text={t.text ? t.text : t.f}
          active={t.f === tab}
        />
      ))}
    </nav>
  );
}
