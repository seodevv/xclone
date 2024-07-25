import styles from './postHeader.module.css';
import Link from 'next/link';
import cx from 'classnames';
import { AdvancedPost } from '@/model/Post';
import OtherProfile from '../profile/OtherProfile';
import OptionSvg from '@/app/_svg/post/OptionSvg';

interface Props {
  post: AdvancedPost;
  isSingle?: boolean;
}

export default function PostHeader({ post, isSingle }: Props) {
  return (
    <div className={cx(styles.postUserSection, isSingle && styles.isSingle)}>
      <OtherProfile user={post.User} isSingle />
      {isSingle && (
        <>
          <div className={styles.postUserInfo}>
            <Link
              href={`/${post.User.id}`}
              className={styles.singlePostMeta}
              onClick={(e) => e.stopPropagation()}
            >
              <span className={styles.postUserName}>{post.User.nickname}</span>
              <span className={styles.postUserId}>@{post.User.id}</span>
            </Link>
          </div>
          <div className={styles.postUserOption}>
            <button>
              <OptionSvg />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
