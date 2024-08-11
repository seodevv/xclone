import styles from './beforeLogin.right.module.css';
import Link from 'next/link';
import cx from 'classnames';

export default function CredentialLogin() {
  return (
    <Link
      className={cx(styles.login, styles.credential)}
      href="/login"
      scroll={false}
    >
      Sign in
    </Link>
  );
}
