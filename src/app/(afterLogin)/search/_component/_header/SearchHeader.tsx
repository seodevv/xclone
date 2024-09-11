import styles from './searchHeader.module.css';
import BackButton from '@/app/(afterLogin)/_component/buttons/BackButton';
import SearchForm from '@/app/(afterLogin)/_component/search/SearchForm';
import OptionButton from '@/app/(afterLogin)/_component/buttons/OptionButton';
import SearchTab from '@/app/(afterLogin)/search/_component/_header/SearchTab';

export default function SearchHeader() {
  return (
    <section className={styles.header}>
      <div className={styles.form}>
        <BackButton />
        <SearchForm
          className={styles.bar}
          style={{ margin: 0, height: '100%' }}
        />
        <div className={styles.options}>
          <OptionButton white />
        </div>
      </div>
      <SearchTab />
    </section>
  );
}
