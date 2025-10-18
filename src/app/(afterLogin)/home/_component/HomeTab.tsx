'use client';

import styles from '../_style/tab.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import { useContext, useEffect } from 'react';
import { HomeTabContext } from './HomeTabProvider';
import XLogoSvg from '@/app/_svg/logo/XLogoSvg';
import useMobileHeader from '@/app/_hooks/useMobileHeader';
import ProfileNav from '@/app/_component/_mobile/ProfileNav';

export default function HomeTab() {
  const { tab, setTab } = useContext(HomeTabContext);
  const { dir, transitClass } = useMobileHeader();

  const onClickRec = () => {
    setTab('rec');
  };
  const onClickFol = () => {
    setTab('fol');
  };

  return (
    <div
      className={cx(
        styles.homeSticky,
        transitClass,
        dir === 'down' && styles.hide
      )}
    >
      <div className={styles.homeTitle}>
        <div className={styles.side}>
          <ProfileNav />
        </div>
        <div className={styles.logo}>
          <XLogoSvg width={25} theme="theme" />
        </div>
        <div className={styles.side}></div>
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
