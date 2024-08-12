'use client';

import PostForm from '@/app/(afterLogin)/_component/post/form/PostForm';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';

interface Props {
  session: Session;
}

export default function ComposePostBody({ session }: Props) {
  const router = useRouter();

  return (
    <div>
      <PostForm
        session={session}
        placeholder="What is hanppening?!"
        minRows={3}
        onSubmitEnd={() => {
          router.back();
        }}
      />
    </div>
  );
}
