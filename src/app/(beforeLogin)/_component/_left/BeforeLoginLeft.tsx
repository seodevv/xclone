import styles from './beforeLogin.left.module.css';
import XLogoSvg from '@/app/_svg/logo/XLogoSvg';

export default function BeforeLoginLeft() {
  return (
    <div className={styles.left}>
      <div className={styles.leftInner}>
        <XLogoSvg className={styles.XLogo} width={600} theme="theme" />
      </div>
    </div>
  );
}
