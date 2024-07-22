'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
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
  const onClick = () => {
    if (isSingle) return;
    router.push(`/${post.User.id}/status/${post.postId}`);
  };

  return (
    <article
      onClickCapture={onClick}
      className={className}
      style={isSingle ? { borderBottom: 'unset', cursor: 'unset' } : {}}
    >
      {children}
    </article>
  );
}
