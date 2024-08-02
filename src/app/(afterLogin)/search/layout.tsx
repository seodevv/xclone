import styles from './searchLayout.module.css';
import SearchHeader from './_component/_header/SearchHeader';

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
