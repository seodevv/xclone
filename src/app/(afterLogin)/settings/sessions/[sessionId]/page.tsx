import styles from '../_component/activeSession.module.css';
import SettingsSubMenu from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SessionDateTime from '@/app/(afterLogin)/settings/sessions/[sessionId]/_component/SessionDateTime';
import SessionLocation from '@/app/(afterLogin)/settings/sessions/[sessionId]/_component/SessionLocation';
import DesktopSvg from '@/app/_svg/_settings/DesktopSvg';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Windows / XClone',
};

export default function SettingsSessionsIdPage() {
  const header = 'Windows';
  return (
    <SettingsSubWrapper header={header} noBack={false}>
      <SettingsSubMenu
        type="button"
        title="Windows"
        sub="Chrome"
        svg={
          <div className={styles.desktop}>
            <DesktopSvg white />
          </div>
        }
        arrow="none"
        select="none"
      />
      <SessionDateTime />
      <SessionLocation />
    </SettingsSubWrapper>
  );
}
