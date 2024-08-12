'use client';
import styles from '../_style/tab.module.css';
import { useContext } from 'react';
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
    <div className={styles.homeSticky}>
      <div className={styles.homeTitle}>
        <span>Home</span>
      </div>
      <div className={styles.homeTab}>
        <div onClick={onClickRec}>
          For you
          <div className={styles.tabIndicator} hidden={tab === 'fol'}></div>
        </div>
        <div onClick={onClickFol}>
          Following
          <div className={styles.tabIndicator} hidden={tab === 'rec'}></div>
        </div>
      </div>
    </div>
  );
}
