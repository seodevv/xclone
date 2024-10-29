import styles from './xLogoHeader.module.css';
import XLogoSvg from '@/app/_svg/logo/XLogoSvg';

export default function XLogoHeader() {
  return (
    <div className={styles.logo}>
      <XLogoSvg width={32} />
    </div>
  );
}
