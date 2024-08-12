import styles from './afterLogin.compose.post.header.module.css';
import utils from '@/app/utility.module.css';
import CloseButton from '@/app/(afterLogin)/_component/buttons/CloseButton';
import TextButton from '@/app/(afterLogin)/_component/buttons/TextButton';

export default function ComposePostHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.close}>
          <CloseButton width={20} prevPath="/home" />
        </div>
        <div className={utils.flexGrow_1}></div>
        <div className={styles.draft}>
          <TextButton text="Drafts" type="primary_trans" />
        </div>
      </div>
    </div>
  );
}
