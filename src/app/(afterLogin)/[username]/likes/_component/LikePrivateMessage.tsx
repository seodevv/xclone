import styles from '../_style/likes.module.css';
import LockSvg from '@/app/_svg/profile/LockSvg';

export default function LikePrivateMessage() {
  const text = 'Your likes are private. Only you can see them.';

  return (
    <div className={styles.meesage}>
      <LockSvg className={styles.lock} width={18.75} theme="theme" active />
      <div className={styles.text}>{text}</div>
    </div>
  );
}
