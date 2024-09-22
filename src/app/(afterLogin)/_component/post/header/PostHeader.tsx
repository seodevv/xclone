import styles from './postHeader.module.css';
import cx from 'classnames';
import Link from 'next/link';
import { AdvancedPost } from '@/model/Post';
import OtherProfile from '../../profile/OtherProfile';
import BadgeButton from '@/app/(afterLogin)/_component/buttons/BadgeButton';
import { Mode } from '@/app/(afterLogin)/_component/post/Post';

interface Props {
  mode: Mode;
  post: AdvancedPost;
}

export default function PostHeader({ mode, post }: Props) {
  return (
    <div
      className={cx(styles.postUserSection, mode === 'single' && styles.single)}
    >
      <OtherProfile mode={mode} user={post.User} />
      {mode === 'compose' && <div className={styles.composeLine}></div>}
      {mode === 'single' && (
        <>
          <div className={styles.postUserInfo}>
            <Link
              href={`/${post.User.id}`}
              className={styles.postMeta}
              onClick={(e) => e.stopPropagation()}
            >
              <span className={styles.postUserName}>
                {post.User.nickname}
                <BadgeButton verified={post.User.verified} unClickable />
              </span>
              <span className={styles.postUserId}>@{post.User.id}</span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
