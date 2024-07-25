import styles from './_style/photoModal.module.css';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import cx from 'classnames'

export default function Loading() {
  return (
    <main className={cx(styles.PhotoModal, styles.isLoading)}>
      <LoadingSpinner />
    </main>
  );
}
