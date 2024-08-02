'use client';
import style from '../_style/tab.module.css';
import { useContext, useEffect } from 'react';
import { HomeTabContext } from './HomeTabProvider';

export default function HomeTab() {
  const { tab, setTab } = useContext(HomeTabContext);

  const onClickRec = () => {
    setTab('rec');
  };
  const onClickFol = () => {
    setTab('fol');
  };

  return (
    <div className={style.homeFixed}>
      <div className={style.homeTab}>
        <div onClick={onClickRec}>
          For you
          <div className={style.tabIndicator} hidden={tab === 'fol'}></div>
        </div>
        <div onClick={onClickFol}>
          Following
          <div className={style.tabIndicator} hidden={tab === 'rec'}></div>
        </div>
      </div>
    </div>
  );
}
