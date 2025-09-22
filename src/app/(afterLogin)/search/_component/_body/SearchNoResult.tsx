import styles from './searchBody.module.css';
import Link from 'next/link';

interface Props {
  q?: string;
}

export default function SearchNoResult({ q }: Props) {
  const result = q ? decodeURIComponent(q) : '';
  return (
    <section className={styles.noResult}>
      <div className={styles.query}>
        <span>{`No results for "${result}"`}</span>
      </div>
      <div className={styles.desc}>
        <span>
          Try searching for something else, or check your{' '}
          <Link href={'/settings/search'} scroll={false}>
            Search settings
          </Link>{' '}
          to see if they’re protecting you from potentially sensitive content.
        </span>
      </div>
    </section>
  );
}
