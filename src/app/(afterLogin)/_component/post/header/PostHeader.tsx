import styles from './postHeader.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import Link from 'next/link';
import { AdvancedPost } from '@/model/Post';
import OtherProfile from '../../profile/OtherProfile';
import BadgeButton from '@/app/(afterLogin)/_component/buttons/BadgeButton';
import { Mode } from '@/app/(afterLogin)/_component/post/Post';
import Text from '@/app/_component/_text/Text';
import PostDate from '@/app/(afterLogin)/_component/post/body/PostDate';

interface Props {
  mode: Mode;
  post: AdvancedPost;
}

export default function PostHeader({ mode, post }: Props) {
  return (
    <div
      className={cx(
        styles.postUserSection,
        mode === 'single' && styles.single,
        mode === 'analytics' && styles.analytics
      )}
    >
      <OtherProfile
        mode={mode}
        user={post.User}
        width={mode === 'analytics' ? 24 : 40}
      />
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
      {mode === 'analytics' && (
        <>
          <Text className={utils.mrl_4} size="m" theme="theme" bold="bold">
            {post.User.nickname}
          </Text>
          <Text size="s" theme="gray">
            @{post.userid}
          </Text>
          <Text size="s" theme="gray">
            ㆍ
          </Text>
          <Text size="s" theme="gray">
            <PostDate date={post.createat} />
          </Text>
        </>
      )}
    </div>
  );
}
