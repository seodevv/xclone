'use client';

import styles from './post.module.css';
import utils from '@/app/utility.module.css';
import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import cx from 'classnames';
import { AdvancedPost } from '@/model/Post';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import { Mode } from '@/app/(afterLogin)/_component/post/Post';
import OptionButton from '@/app/(afterLogin)/_component/buttons/OptionButton';

interface Props {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  mode?: Mode;
  post: AdvancedPost;
  noEvent?: boolean;
  qoute?: boolean;
}

export default function PostArticle({
  className,
  style,
  children,
  mode = 'post',
  post,
  noEvent,
  qoute,
}: Props) {
  const router = useRouter();
  const disabled = post.postId === -1;

  const onClickArticle: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (['single', 'compose'].includes(mode) || disabled) return;
    router.push(`/${post.User.id}/status/${post.postId}`);
  };

  return (
    <article
      className={cx(
        styles.post,
        ['single', 'compose'].includes(mode) && styles.notHover,
        qoute && [styles.quote, utils.cursor_point],
        disabled && [styles.disabled, utils.maxHeight],
        noEvent && utils.pointer_event_none,
        className
      )}
      style={style}
      onClick={onClickArticle}
    >
      {children}
      {disabled && (
        <div
          className={cx(
            utils.absolute,
            utils.t_r_b_l_0,
            utils.d_flexRow,
            utils.flex_alignCenter,
            utils.flex_justiCenter,
            utils.backdrop_blur_s
          )}
        >
          <LoadingSpinner />
        </div>
      )}
    </article>
  );
}
