import styles from './postQuote.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import PostArticle from '@/app/(afterLogin)/_component/post/PostArticle';
import { AdvancedPost } from '@/model/Post';
import OtherProfile from '@/app/(afterLogin)/_component/profile/OtherProfile';
import BadgeButton from '@/app/(afterLogin)/_component/buttons/BadgeButton';
import PostDate from '@/app/(afterLogin)/_component/post/body/PostDate';
import PostContent from '@/app/(afterLogin)/_component/post/body/PostContent';
import PostImages from '@/app/(afterLogin)/_component/post/body/PostImages';

interface Props {
  mode: 'short' | 'long';
  post: AdvancedPost;
  noImage?: boolean;
  noEvent?: boolean;
}

export default function PostQuote({ mode, post, noImage, noEvent }: Props) {
  return (
    <PostArticle post={post} noEvent={noEvent} qoute>
      <div className={cx(utils.d_flexColumn)}>
        <div className={styles.info}>
          <OtherProfile user={post.User} width={24} noevent />
          <span className={styles.nick}>
            {post.User.nickname}
            <BadgeButton verified={post.User.verified} unClickable />
          </span>
          <span className={styles.id}>@{post.User.id}</span>
          <span className={styles.dot}>·</span>
          <PostDate date={post.createat} noEvent />
        </div>
        <div className={cx(styles.body, mode === 'short' && styles.short)}>
          <div
            className={cx(
              styles.content,
              (noImage || post.images.length === 0) && utils.mb_12,
              mode === 'short' && styles.shortContent
            )}
          >
            <PostContent
              postid={post.postid}
              userid={post.User.id}
              content={post.content}
            />
          </div>
          {!noImage && post.images.length !== 0 && (
            <div className={cx(mode === 'short' && styles.shortImage)}>
              <PostImages
                className={cx(styles.longImage, mode === 'short' && utils.mt_0)}
                userid={post.User.id}
                postid={post.postid}
                images={post.images}
                short={mode === 'short'}
              />
            </div>
          )}
        </div>
      </div>
    </PostArticle>
  );
}
