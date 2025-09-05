'use client';

import { useContext } from 'react';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import usePostPinnedMutation from '@/app/(afterLogin)/_hooks/usePostPinnedMutation';
import useAlterModal from '@/app/_hooks/useAlterModal';
import ConfirmModal from '@/app/(afterLogin)/_component/alter/ConfirmModal';
import { AdvancedPost } from '@/model/Post';

interface Props {
  post: AdvancedPost;
  sessionid: string;
}

export default function UnPinModal({ post, sessionid }: Props) {
  const { dispatchMenu, close } = useContext(SubMenuContext);
  const { alterMessage } = useAlterModal();
  const unPinMutation = usePostPinnedMutation();

  const backSubMenu = () => {
    dispatchMenu({
      type: 'set',
      payload: { status: { type: 'post', post, sessionid } },
    });
  };

  const onClickUnPin = () => {
    unPinMutation.mutate(
      {
        method: 'delete',
        postid: post.postid,
        sessionid,
      },
      {
        onSettled: () => {
          alterMessage('Your post was unpinned from your profile');
          close();
        },
      }
    );
  };

  return (
    <ConfirmModal
      title="Unpin post from profile?"
      sub="This will no longer appear automatically at the top of your profile."
      btnText="Unpin"
      btnTheme="theme"
      onClickOutSide={backSubMenu}
      onClickConfirm={onClickUnPin}
      onClickCancle={backSubMenu}
    />
  );
}
