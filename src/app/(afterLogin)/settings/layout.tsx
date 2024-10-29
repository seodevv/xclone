import styles from './settings.layout..module.css';
import SettingsSearchForm from '@/app/(afterLogin)/settings/_component/SettingsSearchForm';
import PageHeader from '@/app/(afterLogin)/_component/_page/PageHeader';
import SettingsMenus from '@/app/(afterLogin)/settings/_component/SettingsMenus';

interface Props {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: Props) {
  return (
    <main className={styles.main}>
      <section className={styles.middle}>
        <PageHeader title="Settings" noBack />
        <div className={styles.content}>
          <SettingsSearchForm />
          <SettingsMenus />
        </div>
      </section>
      <section className={styles.right}>{children}</section>
    </main>
  );
}
