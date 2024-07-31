import styles from '../_style/userPosts.module.css';

export default function NoMedia() {
  const title = 'Lights, camera ... attachments!';
  const message = 'When you post photos or videos, they will show up here.';

  return (
    <div className={styles.noMedia}>
      <div className={styles.title}>
        <span>{title}</span>
      </div>
      <div className={styles.message}>
        <span>{message}</span>
      </div>
    </div>
  );
}
