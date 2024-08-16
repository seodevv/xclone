'use client';

import style from './postBody.module.css';
import cx from 'classnames';
import { AdvancedPost } from '@/model/Post';
import ReactionButton from '@/app/(afterLogin)/_component/buttons/ReactionButton';

type Props = {
  post: AdvancedPost;
  isSingle?: boolean;
  isPhoto?: boolean;
  white?: boolean;
  width?: number;
};

export default function ActionButtons({
  post,
  isSingle = false,
  isPhoto = false,
  white = false,
  width = 18.75,
}: Props) {
  return (
    <div className={cx(style.actionButtons, isSingle && style.single)}>
      <ReactionButton type="Comments" post={post} width={width} white={white} />
      <ReactionButton type="Reposts" post={post} width={width} white={white} />
      <ReactionButton type="Hearts" post={post} width={width} white={white} />
      {isSingle ? (
        <ReactionButton
          type="Bookmarks"
          post={post}
          width={width}
          white={white}
        />
      ) : (
        <ReactionButton type="Views" post={post} width={width} white={white} />
      )}
      <div className={style.doubleButton}>
        {!isSingle && !isPhoto && (
          <ReactionButton
            type="Bookmarks"
            post={post}
            width={width}
            white={white}
          />
        )}
        <ReactionButton type="Shares" post={post} width={width} white={white} />
      </div>
    </div>
  );
}
