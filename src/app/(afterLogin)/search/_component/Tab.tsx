'use client';

import style from '../search.module.css';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Tab() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [current, setCurrent] = useState('hot');

  const onClickHot = () => {
    setCurrent('hot');

    const url = new URLSearchParams(searchParams);
    if (url.get('f')) {
      url.delete('f');
    }
    router.replace(`/search?${url.toString()}`);
  };
  const onClickNew = () => {
    setCurrent('new');

    const url = new URLSearchParams(searchParams);
    url.set('f', 'live');
    router.replace(`/search?${url.toString()}`);
  };

  return (
    <div className={style.homeFixed}>
      <div className={style.homeTab}>
        <div onClick={onClickHot}>
          인기
          <div className={style.tabIndicator} hidden={current === 'new'}></div>
        </div>
        <div onClick={onClickNew}>
          최신
          <div className={style.tabIndicator} hidden={current === 'hot'}></div>
        </div>
      </div>
    </div>
  );
}
