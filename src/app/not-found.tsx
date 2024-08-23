import styles from './notFound.module.css';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className={styles.notFound}>
      <div className={styles.background_decor}></div>
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.paragraph}>
          Sorry, the page you're looking for cannot be found.
        </p>
        <Link href="/" className={styles.link}>
          Go back to the homepage
        </Link>
      </div>
    </main>
  );
}
