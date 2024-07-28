import Link from 'next/link';
import styles from '../_style/search.module.css';

interface Props {
  q?: string;
}

export default function SearchNoResult({ q }: Props) {
  return (
    <section className={styles.noResult}>
      <div className={styles.query}>
        <span>No results for "{q}"</span>
      </div>
      <div className={styles.desc}>
        <span>
          Try searching for something else, or check your{' '}
          <Link href={'/setting/search'}>Search settings</Link> to see if
          they’re protecting you from potentially sensitive content.
        </span>
      </div>
    </section>
  );
}
