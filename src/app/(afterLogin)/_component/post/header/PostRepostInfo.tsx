import styles from './postHeader.module.css';
import RepostSvg from '@/app/_svg/actionbuttons/RepostSvg';
import { Session } from 'next-auth';
import { AdvancedPost } from '@/model/Post';
import Link from 'next/link';

interface Props {
  session: Session | null;
  userid: AdvancedPost['User']['id'];
}

export default function PostRepostInfo({ session, userid }: Props) {
  if (!session) return null;

  return (
    <div className={styles.postRepostInfoSection}>
      <div className={styles.postRepostInfo}>
        <div className={styles.repostIcon}>
          <RepostSvg width={16} />
        </div>
        <Link
          href={`/${userid}`}
          className={styles.repostInfo}
          onClick={(e) => e.stopPropagation()}
        >
          <span>{session?.user?.email === userid ? 'You' : userid}</span>
          <span>reposted</span>
        </Link>
      </div>
    </div>
  );
}
