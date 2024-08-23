'use client';

import { useContext } from 'react';
import RepostSvg from '@/app/_svg/actionbuttons/RepostSvg';
import EditSvg from '@/app/_svg/tweet/EditSvg';
import useReactionMutation from '@/app/(afterLogin)/_hooks/useReactionMutation';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import { useSession } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';
import SubMenu from '@/app/(afterLogin)/_component/_context/SubMenu';
import SubMenuWrapper from '@/app/(afterLogin)/_component/_context/SubMenuWrapper';

export default function RepostSubMenu() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const reactionMutation = useReactionMutation();
  const { menu, dispatchMenu } = useContext(SubMenuContext);
  const isReposted = menu.post?.Reposts.some(
    (u) => u.id === session?.user?.email
  );

  return (
    <SubMenuWrapper position="center">
      <SubMenu
        type="div"
        svg={<RepostSvg width={18.75} white />}
        title={isReposted ? 'Undo repost' : 'Repost'}
        onClick={() => {
          if (
            !menu.post ||
            !session?.user?.email ||
            !session.user.image ||
            !session.user.name
          ) {
            return;
          }

          reactionMutation.mutate({
            type: 'Reposts',
            method: isReposted ? 'delete' : 'post',
            post: menu.post,
            session: {
              email: session.user.email,
              image: session.user.image,
              name: session.user.name,
            },
            queryClient,
          });
          dispatchMenu({ type: 'reset' });
        }}
      />
      <SubMenu
        type="link"
        href="/compose/post"
        scroll={false}
        svg={<EditSvg width={18.75} white />}
        title="quote"
        onClick={() => {
          dispatchMenu({ type: 'reset' });
        }}
      />
    </SubMenuWrapper>
  );
}
