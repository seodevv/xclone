import styles from './afterLogin.component.postForm.module.css';

interface Props {
  userid?: string;
  active?: boolean;
}

export default function ReplyInfo({ userid, active }: Props) {
  if (!userid || (typeof active !== 'undefined' && !active)) {
    return null;
  }

  return (
    <div className={styles.replyInfoSection}>
      <div></div>
      <div className={styles.replyInfo}>
        <button type="button" className={styles.replyInfoButton}>
          Replying to <span>@{userid}</span>
        </button>
      </div>
    </div>
  );
}
