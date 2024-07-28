'use client';

import style from '../_style/search.module.css';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import cx from 'classnames';
import { captialCase } from '@/app/_lib/common';

type Tab = 'top' | 'live' | 'user' | 'media' | 'lists';

export default function SearchTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const f = searchParams.get('f');
  const [tab, setTab] = useState<Tab>(f ? (f as Tab) : 'top');
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

  return (
    <nav className={style.tabs}>
      {tabs.map((t) => (
        <button key={t.f} className={style.tab} onClick={() => changeTabs(t.f)}>
          <div className={cx(style.navigation, t.f === tab && style.active)}>
            <div>{t.text ? captialCase(t.text) : captialCase(t.f)}</div>
            <div></div>
          </div>
        </button>
      ))}
    </nav>
  );
}
