import styles from './userBody.module.css';

export default function NoProfile() {
  return (
    <div className={styles.userNotFound}>
      <div>This account doesn&apos;t exist</div>
      <div>Try searching for another.</div>
    </div>
  );
}
