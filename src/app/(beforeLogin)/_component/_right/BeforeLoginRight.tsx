import styles from './beforeLogin.right.module.css';
import Link from 'next/link';
import GithubLogin from './GithubLogin';
import GoogleLogin from './GoogleLogin';
import CredentialLogin from './CredentialLogin';

export default function BeforeLoginRight() {
  return (
    <div className={styles.right}>
      <div className={styles.rightInner}>
        <h1 className={styles.something}>Happening now</h1>
        <h2 className={styles.joinUs}>Join today.</h2>
        <div className={styles.buttons}>
          <GoogleLogin />
          <GithubLogin style={{ marginTop: 15 }} />
          <p className={styles.or}>or</p>
          <Link href="/i/flow/signup" className={styles.login} scroll={false}>
            Create account
          </Link>
          <p className={styles.info}>
            By signing up, you agress to the{' '}
            <Link href="#">Terms of Service</Link> and{' '}
            <Link href="#">Privacy Policy,</Link> including{' '}
            <Link href="#">Cookie Use.</Link>
          </p>
          <h3 className={styles.question}>Already have an account?</h3>
          <CredentialLogin />
        </div>
      </div>
    </div>
  );
}
