'use client';

import useUnPostMutation from '@/app/(afterLogin)/_hooks/useUnPostMutation';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import { useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import useAlterModal from '@/app/_hooks/useAlterModal';
import ConfirmModal from '@/app/(afterLogin)/_component/alter/ConfirmModal';

export default function UnPostModal() {
  const { alterMessage } = useAlterModal();
  const queryClient = useQueryClient();
  const unPostMutation = useUnPostMutation();
  const {
    menu: { post },
    dispatchMenu,
  } = useContext(SubMenuContext);

  const closeModal = () => {
    dispatchMenu({ type: 'set', payload: { status: 'post' } });
  };

  const unPostHandler = () => {
    if (!post) return;

    unPostMutation.mutate(
      {
        queryClient,
        post,
      },
      {
        onSuccess: () => {
          alterMessage('Your post was deleted');
          dispatchMenu({ type: 'reset' });
        },
        onError: (error) => {
          console.error(error);
          alterMessage('Failed to delete post.\nplease try again', 'error');
        },
      }
    );
  };

  return (
    <ConfirmModal
      title="Delete post?"
      sub="This can’t be undone and it will be removed from your profile, the
            timeline of any accounts that follow you, and from search results."
      btnText="Delete"
      btnTheme="red"
      onClickOutSide={closeModal}
      onClickConfirm={unPostHandler}
      onClickCancle={closeModal}
    />
  );
}
