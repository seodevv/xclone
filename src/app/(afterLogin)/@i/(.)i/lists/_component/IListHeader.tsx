'use client';

import styles from './i.list.header.module.css';
import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import TextButton from '@/app/(afterLogin)/_component/buttons/TextButton';

export default function IListHeader() {
  return (
    <IHeader kind="xmark">
      <div className={styles.middle}>
        <div className={styles.title}>
          <span>Pick a List</span>
        </div>
      </div>
      <div className={styles.save}>
        <TextButton text="Save" />
      </div>
    </IHeader>
  );
}
