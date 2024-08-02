'use client';

import styles from './post.module.css';
import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import cx from 'classnames';
import { AdvancedPost } from '@/model/Post';

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
  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSingle) return;
    router.push(`/${post.User.id}/status/${post.postId}`);
  };

  return (
    <article
      className={cx(styles.post, isSingle && styles.single, className)}
      style={style}
      onClick={onClick}
    >
      {children}
    </article>
  );
}
