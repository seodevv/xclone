import styles from './afterLogin.component.postForm.module.css';

interface Props {
  userId?: string;
  active?: boolean;
}

export default function ReplyInfo({ userId, active }: Props) {
  if (!userId || (typeof active !== 'undefined' && !active)) {
    return null;
  }

  return (
    <div className={styles.replyInfoSection}>
      <div></div>
      <div className={styles.replyInfo}>
        <button type="button" className={styles.replyInfoButton}>
          Replying to <span>@{userId}</span>
        </button>
      </div>
    </div>
  );
}
