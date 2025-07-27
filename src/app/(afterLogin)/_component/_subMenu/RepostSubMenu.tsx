'use client';

import { useContext } from 'react';
import RepostSvg from '@/app/_svg/actionbuttons/RepostSvg';
import EditSvg from '@/app/_svg/tweet/EditSvg';
import useReactionMutation from '@/app/(afterLogin)/_hooks/useReactionMutation';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import { useQueryClient } from '@tanstack/react-query';
import SubMenu from '@/app/(afterLogin)/_component/_subMenu/SubMenu';
import SubMenuWrapper from '@/app/(afterLogin)/_component/_subMenu/SubMenuWrapper';
import { AdvancedPost } from '@/model/Post';

interface Props {
  post: AdvancedPost;
  sessionid: string;
}

export default function RepostSubMenu({ post, sessionid }: Props) {
  const queryClient = useQueryClient();
  const reactionMutation = useReactionMutation();
  const { close } = useContext(SubMenuContext);
  const isReposted = post.Reposts.some((u) => u.id === sessionid);

  return (
    <SubMenuWrapper position="center">
      <SubMenu
        type="div"
        svg={<RepostSvg width={18.75} white />}
        title={isReposted ? 'Undo repost' : 'Repost'}
        onClick={() => {
          reactionMutation.mutate({
            type: 'Reposts',
            method: isReposted ? 'delete' : 'post',
            post,
            sessionid,
            queryClient,
          });
          close();
        }}
      />
      <SubMenu
        type="link"
        href="/compose/post"
        scroll={false}
        svg={<EditSvg theme="white" width={18.75} />}
        title="quote"
        onClick={() => {
          close();
        }}
      />
    </SubMenuWrapper>
  );
}
