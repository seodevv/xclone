import styles from './messages.header.module.css';
import PageHeader from '@/app/(afterLogin)/_component/_page/PageHeader';
import SettingSvg from '@/app/_svg/navbar/SettingSvg';
import Link from 'next/link';
import AddMessageSvg from '@/app/_svg/_settings/AddMessageSvg';

export default function MessagesHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        <PageHeader title="Messages" noBack>
          <div className={styles.options}>
            <Link className={styles.link} href={'/messages/settings'}>
              <SettingSvg width={19} white />
            </Link>
            <Link className={styles.link} href={'/messages/compose'}>
              <AddMessageSvg width={19} white />
            </Link>
          </div>
        </PageHeader>
      </div>
    </div>
  );
}
