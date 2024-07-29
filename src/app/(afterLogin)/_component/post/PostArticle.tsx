'use client';

import styles from './post.module.css';
import { MouseEventHandler, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import cx from 'classnames';
import { AdvancedPost } from '@/model/Post';

type Props = {
  children: ReactNode;
  post: AdvancedPost;
  className?: string;
  isSingle?: boolean;
};

export default function PostArticle({
  children,
  post,
  className,
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
      onClick={onClick}
      className={cx(styles.post, isSingle && styles.single, className)}
    >
      {children}
    </article>
  );
}
