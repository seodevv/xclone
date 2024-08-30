import styles from './noQuote.module.css';

export default function NoQuote() {
  return (
    <div className={styles.noQuote}>
      <div className={styles.inner}>
        <div className={styles.unavailable}>
          <span>This post is unavailable.</span>
        </div>
      </div>
    </div>
  );
}
