'use client';

import styles from '../_style/tab.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
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
          <span className={cx(tab === 'rec' && utils.fw_bold)}>For you</span>
          <div className={styles.tabIndicator} hidden={tab === 'fol'}></div>
        </div>
        <div onClick={onClickFol}>
          <span className={cx(tab === 'fol' && utils.fw_bold)}>Following</span>
          <div className={styles.tabIndicator} hidden={tab === 'rec'}></div>
        </div>
      </div>
    </div>
  );
}
