'use client';

import PostSubMenuOther from '@/app/(afterLogin)/_component/_context/PostSubMenuOther';
import PostSubMenuSession from '@/app/(afterLogin)/_component/_context/PostSubMenuSession';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';

export default function PostSubMenu() {
  const { data: session } = useSession();
  const { menu } = useContext(SubMenuContext);
  const isOwn = session?.user?.email === menu.post?.User.id;

  if (isOwn) {
    return <PostSubMenuSession />;
  }

  return <PostSubMenuOther />;
}
