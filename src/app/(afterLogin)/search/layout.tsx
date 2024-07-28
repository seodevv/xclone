import styles from './_style/searchLayout.module.css';
import SearchHeader from './_component/SearchHeader';

interface Props {
  children: React.ReactNode;
}

export default function SearchLayout({ children }: Props) {
  return (
    <main className={styles.main}>
      <SearchHeader />
      {children}
    </main>
  );
}
