'use client';

import styles from '../settings.layout.module.css';
import PageHeader from '@/app/(afterLogin)/_component/_page/PageHeader';
import SettingsMenus from '@/app/(afterLogin)/settings/_component/SettingsMenus';
import SettingsSearchForm from '@/app/(afterLogin)/settings/_component/SettingsSearchForm';
import { usePathname } from 'next/navigation';
import useViewport from '@/app/(afterLogin)/_hooks/useViewport';

export default function SettingsLeftSection() {
  const pathname = usePathname();
  const { width } = useViewport();

  if (pathname !== '/settings' && width !== null && width <= 1024) {
    return null;
  }

  return (
    <section className={styles.left}>
      <PageHeader title="Settings" noBack />
      <div className={styles.leftInner}>
        <SettingsSearchForm />
        <SettingsMenus />
      </div>
    </section>
  );
}
