'use client';

import useFollowMutation from '../../_hooks/useFollowMutation';
import { useQueryClient } from '@tanstack/react-query';
import useAlterModal from '@/app/_hooks/useAlterModal';
import ConfirmModal from '@/app/(afterLogin)/_component/alter/ConfirmModal';
import { useContext } from 'react';
import { ConfirmContext } from '@/app/(afterLogin)/_provider/ConfirmProvider';

export default function UnFollowModal() {
  const queryClient = useQueryClient();
  const followMutation = useFollowMutation();
  const { modal, dispatchModal } = useContext(ConfirmContext);
  const { alterMessage } = useAlterModal();

  const onClickOutSide = () => {
    dispatchModal({ type: 'reset' });
  };
  const onClickUnFollow = () => {
    if (!modal.unFollow?.sourceId || !modal.unFollow.targetId) {
      dispatchModal({ type: 'reset' });
      alterMessage('Error. Please try again.', 'error');
      return;
    }
    followMutation.mutate(
      {
        queryClient,
        type: 'unfollow',
        sourceId: modal.unFollow.sourceId,
        targetId: modal.unFollow.targetId,
      },
      {
        onSettled: () => {
          dispatchModal({ type: 'reset' });
        },
        onError: () => {
          alterMessage('Error. Please try again.', 'error');
        },
      }
    );
  };

  return (
    <ConfirmModal
      title={`Unfollow @${modal.unFollow?.targetId}?`}
      sub="Their posts will no longer show up in your For You timeline. You can still view their profile, unless their posts are protected."
      btnText="UnFollow"
      btnTheme="theme"
      onClickOutSide={onClickOutSide}
      onClickConfirm={onClickUnFollow}
      onClickCancle={onClickOutSide}
    />
  );
}
