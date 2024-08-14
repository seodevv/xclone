'use client';

import styles from './post.module.css';
import utils from '@/app/utility.module.css';
import {
  CSSProperties,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import cx from 'classnames';
import { AdvancedPost } from '@/model/Post';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';

interface Props {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  post: AdvancedPost;
  isSingle?: boolean;
}

export default function PostArticle({
  className,
  style,
  children,
  post,
  isSingle = false,
}: Props) {
  const router = useRouter();
  const disabled = post.postId === -1;

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSingle) return;
    if (disabled) return;
    router.push(`/${post.User.id}/status/${post.postId}`);
  };

  return (
    <article
      className={cx(
        styles.post,
        isSingle && styles.single,
        disabled && [styles.disabled, styles.maxHeight],
        className
      )}
      style={style}
      onClick={onClick}
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
