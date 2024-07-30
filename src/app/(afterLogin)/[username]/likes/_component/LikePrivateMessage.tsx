import styles from '../_style/likes.module.css';
import LockSvg from '@/app/_svg/profile/LockSvg';

export default function LikePrivateMessage() {
  const text = 'Your likes are private. Only you can see them.';

  return (
    <div className={styles.meesage}>
      <div className={styles.lock}>
        <LockSvg width={18.75} white />
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
}
