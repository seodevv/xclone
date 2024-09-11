'use client';

import { useContext } from 'react';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import usePostPinnedMutation from '@/app/(afterLogin)/_hooks/usePostPinnedMutation';
import { useQueryClient } from '@tanstack/react-query';
import useAlterModal from '@/app/_hooks/useAlterModal';
import ConfirmModal from '@/app/(afterLogin)/_component/alter/ConfirmModal';

export default function UnPinModal() {
  const { menu, dispatchMenu } = useContext(SubMenuContext);
  const { alterMessage } = useAlterModal();
  const unPinMutation = usePostPinnedMutation();
  const queryClient = useQueryClient();

  const backSubMenu = () => {
    dispatchMenu({ type: 'set', payload: { status: 'post' } });
  };

  const onClickUnPin = () => {
    if (!menu.post) return;

    unPinMutation.mutate({
      method: 'delete',
      post: menu.post,
      queryClient,
    });

    dispatchMenu({ type: 'reset' });
    alterMessage('Your post was unpinned from your profile');
  };

  return (
    <ConfirmModal
      title="Unpin post from profile?"
      sub="This will no longer appear automatically at the top of your profile."
      btnText="Unpin"
      btnTheme="white"
      onClickOutSide={backSubMenu}
      onClickConfirm={onClickUnPin}
      onClickCancle={backSubMenu}
    />
  );
}
