'use client';

import style from './search.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import SearchForm from '@/app/(afterLogin)/_component/search/SearchForm';

export default function RightSearchZone() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterClear = (type: 'pf' | 'lf') => {
    const url = new URLSearchParams(searchParams);
    url.delete(type);
    router.push(`/search?${url.toString()}`);
  };

  const setFilter = (type: 'pf' | 'lf') => {
    const url = new URLSearchParams(searchParams);
    url.set(type, type === 'pf' ? 'en' : 'on');
    router.push(`/search?${url.toString()}`);
  };

  if (pathname === '/explore') {
    return null;
  }

  if (pathname === '/search') {
    return (
      <div>
        <h5 className={style.filterTitle}>Search filters</h5>
        <div className={style.filterSection}>
          <div>
            <label>People</label>
            <div className={style.radio}>
              <div>From anyone</div>
              <input
                type="radio"
                name="pf"
                defaultChecked
                onChange={() => filterClear('pf')}
              />
            </div>

            <div className={style.radio}>
              <div>People you follow</div>
              <input
                type="radio"
                name="pf"
                value="on"
                onChange={() => setFilter('pf')}
              />
            </div>
          </div>
          <div style={{ marginTop: '10px' }}>
            <label>Location</label>
            <div className={style.radio}>
              <div>Anywhere</div>
              <input
                type="radio"
                name="lf"
                defaultChecked
                onChange={() => filterClear('lf')}
              />
            </div>
            <div className={style.radio}>
              <div>Near you</div>
              <input
                type="radio"
                name="lf"
                value="on"
                onChange={() => setFilter('lf')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 60, width: 'inherit' }}>
      <SearchForm />
    </div>
  );
}
