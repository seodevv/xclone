import styles from './settings.layout.module.css';
import SettingsLayoutController from '@/app/(afterLogin)/settings/_controller/SettingsLayoutController';
import SettingsLeftSection from '@/app/(afterLogin)/settings/_component/SettingsLeftSection';
import SettingsRightSection from '@/app/(afterLogin)/settings/_component/SettingsRightSection';

interface Props {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: Props) {
  return (
    <SettingsLayoutController page={children}>
      <main className={styles.main}>
        <SettingsLeftSection />
        <SettingsRightSection>{children}</SettingsRightSection>
      </main>
    </SettingsLayoutController>
  );
}
