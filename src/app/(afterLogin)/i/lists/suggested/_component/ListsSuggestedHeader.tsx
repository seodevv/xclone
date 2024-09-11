import BackButton from '@/app/(afterLogin)/_component/buttons/BackButton';
import styles from './listsSuggested.header.module.css';

export default function ListsSuggestedHeader() {
  const title = 'Suggested Lists';

  return (
    <div className={styles.header}>
      <BackButton />
      <div className={styles.title}>
        <span>{title}</span>
      </div>
    </div>
  );
}
