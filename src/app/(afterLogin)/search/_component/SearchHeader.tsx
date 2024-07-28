'use client';

import styles from '../_style/search.module.css';
import BackButton from '../../_component/buttons/BackButton';
import SearchForm from '../../_component/search/SearchForm';
import OptionButton from '../../_component/buttons/OptionButton';
import SearchTab from './SearchTab';
import { useSearchParams } from 'next/navigation';

export default function SearchHeader() {
  const searchParams = useSearchParams();

  return (
    <section className={styles.header}>
      <div className={styles.form}>
        <BackButton />
        <SearchForm
          className={styles.bar}
          style={{ margin: 0, height: '100%' }}
          q={searchParams.get('q')}
        />
        <div className={styles.options}>
          <OptionButton white />
        </div>
      </div>
      <SearchTab />
    </section>
  );
}
