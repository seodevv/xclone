'use client';

import style from './postBody.module.css';
import cx from 'classnames';
import { AdvancedPost } from '@/model/Post';
import ReactionButton from '@/app/(afterLogin)/_component/buttons/ReactionButton';
import { Mode } from '@/app/(afterLogin)/_component/post/Post';

type Props = {
  mode: Mode;
  post: AdvancedPost;
  isPhoto?: boolean;
  white?: boolean;
  width?: number;
};

export default function ActionButtons({
  mode,
  post,
  isPhoto = false,
  white = false,
  width = 18.75,
}: Props) {
  return (
    <div className={cx(style.actionButtons, mode === 'single' && style.single)}>
      <ReactionButton type="Comments" post={post} width={width} white={white} />
      <ReactionButton type="Reposts" post={post} width={width} white={white} />
      <ReactionButton type="Hearts" post={post} width={width} white={white} />
      {mode === 'single' ? (
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
        {mode !== 'single' && !isPhoto && (
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
