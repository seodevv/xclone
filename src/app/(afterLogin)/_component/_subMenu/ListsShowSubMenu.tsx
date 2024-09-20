'use client';

import SubMenu from '@/app/(afterLogin)/_component/_subMenu/SubMenu';
import SubMenuWrapper from '@/app/(afterLogin)/_component/_subMenu/SubMenuWrapper';
import useListsUnShowMutation from '@/app/(afterLogin)/_hooks/useListsUnShowMutation';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { AdvancedLists } from '@/model/Lists';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';

interface Props {
  lists: AdvancedLists;
}

export default function ListsShowSubMenu({ lists }: Props) {
  const { data: session } = useSession();
  const isUnShow =
    session?.user?.email &&
    lists.UnShow.map((u) => u.id).includes(session.user.email);
  const title = isUnShow
    ? `Show these posts in For you`
    : `Dont't show these posts in For you`;
  const sub = isUnShow
    ? `Top posts from this List may show up in your For you timeline.`
    : `Top posts from this List will no longer show up in your For you timeline.`;

  const { dispatchMenu } = useContext(SubMenuContext);
  const { alterMessage } = useAlterModal();
  const queryClient = useQueryClient();
  const listsUnShowMutation = useListsUnShowMutation();
  const onClickListsShow = () => {
    if (!session?.user?.email) return;

    const method = isUnShow ? 'delete' : 'post';
    listsUnShowMutation.mutate(
      {
        queryClient,
        method,
        listId: lists.id,
        userId: lists.userId,
        sessionId: session.user.email,
      },
      {
        onSuccess: () => {
          alterMessage(
            method === 'post'
              ? 'Top posts from this List will no longer show up in For you.'
              : 'Top posts from this List may now show up in For you.'
          );
          dispatchMenu({ type: 'reset' });
        },
        onError: () => {
          alterMessage('something is wrong. please try again.');
        },
      }
    );
  };

  return (
    <SubMenuWrapper position="left">
      <div style={{ width: 384 }}>
        <SubMenu
          type="div"
          title={title}
          sub={sub}
          onClick={onClickListsShow}
        />
      </div>
    </SubMenuWrapper>
  );
}
