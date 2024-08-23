'use client';

import styles from './compose.post.header.module.css';
import utils from '@/app/utility.module.css';
import CloseButton from '@/app/(afterLogin)/_component/buttons/CloseButton';
import TextButton from '@/app/(afterLogin)/_component/buttons/TextButton';
import useComposeStore from '@/app/(afterLogin)/_store/ComposeStore';

export default function ComposePostHeader() {
  const reset = useComposeStore((state) => state.reset);

  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.close}>
          <CloseButton width={20} prevPath="/home" onClick={() => reset()} />
        </div>
        <div className={utils.flexGrow_1}></div>
        <div className={styles.draft}>
          <TextButton text="Drafts" type="primary_trans" />
        </div>
      </div>
    </div>
  );
}
