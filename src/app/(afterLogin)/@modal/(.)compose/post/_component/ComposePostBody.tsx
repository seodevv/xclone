'use client';

import PostForm from '@/app/(afterLogin)/_component/post/form/PostForm';
import Post from '@/app/(afterLogin)/_component/post/Post';
import useComposeStore from '@/app/(afterLogin)/_store/ComposeStore';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';

interface Props {
  session: Session;
}

export default function ComposePostBody({ session }: Props) {
  const router = useRouter();
  const post = useComposeStore((state) => state.post);
  const type = useComposeStore((state) => state.type);

  return (
    <div>
      {post && type === 'comment' && (
        <Post mode="compose" post={post} noImage noReact />
      )}
      <PostForm
        session={session}
        mode="compose"
        parent={
          type === 'comment' && post
            ? { postId: post.postId, userId: post.User.id }
            : undefined
        }
        repost={type === 'quote' ? post : undefined}
        placeholder="What is hanppening?!"
        minRows={3}
        onSubmitEnd={() => {
          router.back();
        }}
      />
    </div>
  );
}
