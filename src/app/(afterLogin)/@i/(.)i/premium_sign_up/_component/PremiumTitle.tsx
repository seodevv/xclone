import styles from './i.premiumSignup.title.module.css';
import Link from 'next/link';

export default function PremiumTitle() {
  return (
    <div className={styles.title}>
      <div className={styles.main}>
        <span>Upgrade to Premium</span>
      </div>
      <div className={styles.sub}>
        <span>
          Enjoy an enhanced experience, exclusive creator tools, top-tier
          verification and security.
        </span>
      </div>
      <div className={styles.organizations}>
        <span>
          &#40;For organizations,
          <Link href="/i/verified-orgs-signup" className={styles.signup}>
            sign up here
          </Link>
          &#41;
        </span>
      </div>
    </div>
  );
}
