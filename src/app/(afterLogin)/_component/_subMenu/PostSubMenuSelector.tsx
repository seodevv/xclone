'use client';

import PostSubMenuOther from '@/app/(afterLogin)/_component/_subMenu/PostSubMenuOther';
import PostSubMenuSession from '@/app/(afterLogin)/_component/_subMenu/PostSubMenuSession';
import { AdvancedPost } from '@/model/Post';

interface Props {
  post: AdvancedPost;
  sessionid: string;
}

export default function PostSubMenuSelector({ post, sessionid }: Props) {
  const isOwn = sessionid === post.userid;

  if (isOwn) {
    return <PostSubMenuSession post={post} sessionid={sessionid} />;
  }

  return <PostSubMenuOther post={post} />;
}
