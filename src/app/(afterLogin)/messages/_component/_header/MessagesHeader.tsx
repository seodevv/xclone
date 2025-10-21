import styles from './messages.header.module.css';
import PageHeader from '@/app/(afterLogin)/_component/_page/PageHeader';
import SettingSvg from '@/app/_svg/navbar/SettingSvg';
import Link from 'next/link';
import AddMessageSvg from '@/app/_svg/_settings/AddMessageSvg';
import ProfileNav from '@/app/_component/_mobile/ProfileNav';

interface Props {}

export default function MessagesHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        <ProfileNav />
        <PageHeader title="Messages" noBack>
          <div className={styles.options}>
            <Link className={styles.link} href={'/messages/settings'}>
              <SettingSvg width={19} theme="theme" />
            </Link>
            <Link className={styles.link} href={'/messages/compose'}>
              <AddMessageSvg width={19} theme="theme" />
            </Link>
          </div>
        </PageHeader>
      </div>
    </div>
  );
}
