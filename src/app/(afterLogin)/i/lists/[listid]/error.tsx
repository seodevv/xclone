'use client';

import styles from './userLists.error.module.css';
import cx from 'classnames';
import Link from 'next/link';
import RefreshSvg from '@/app/_svg/error/RefreshSvg';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ListsError({ error, reset }: Props) {
  let message = 'Something went wrong. Try reloading.';
  let button = (
    <button className={styles.reset} onClick={() => reset()}>
      <RefreshSvg white inherit />
      <span className={styles.text}>Retry</span>
    </button>
  );

  if (error.message === 'not-found') {
    message = 'These lists do not exist. Try searching other lists.';
    button = (
      <Link className={cx(styles.reset, styles.search)} href="/i/lists/search">
        Search
      </Link>
    );
  }

  return (
    <main className={styles.error}>
      <div className={styles.message}>
        <span>{message}</span>
      </div>
      {button}
    </main>
  );
}
