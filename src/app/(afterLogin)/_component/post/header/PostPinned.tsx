import PinedSvg from '@/app/_svg/post/PinedSvg';
import styles from './postHeader.module.css';

export default function PostPinned() {
  return (
    <div className={styles.postPinned}>
      <div className={styles.pinned}>
        <PinedSvg width={16} active />
      </div>
      <div className={styles.pinnedText}>
        <span>Pinned</span>
      </div>
    </div>
  );
}
