import styles from './settingsMonetization.page.module.css';
import { Metadata } from 'next';
import MonetizationHeader from '@/app/(afterLogin)/settings/monetization/_component/MonetizationHeader';
import MonetizationBody from '@/app/(afterLogin)/settings/monetization/_component/MonetizationBody';
import MonetizationLayoutController from '@/app/(afterLogin)/settings/monetization/_component/MonetizationLayoutController';

export const metadata: Metadata = {
  title: 'Monetization / XClone',
};

export default function SettingsMonetizationPage() {
  return (
    <main className={styles.container}>
      <div className={styles.inner}>
        <MonetizationLayoutController />
        <MonetizationHeader />
        <MonetizationBody />
      </div>
    </main>
  );
}
