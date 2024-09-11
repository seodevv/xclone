'use client';

import ConfirmModal from '@/app/(afterLogin)/_component/alter/ConfirmModal';
import useUnListsMutation from '@/app/(afterLogin)/_hooks/useUnListsMutation';
import { ConfirmContext } from '@/app/(afterLogin)/_provider/ConfirmProvider';
import useHistoryStore from '@/app/(afterLogin)/_store/HistoryStore';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

export default function UnListsModal() {
  const router = useRouter();
  const { data: session } = useSession();
  const { alterMessage } = useAlterModal();
  const { modal, dispatchModal } = useContext(ConfirmContext);
  const queryClient = useQueryClient();
  const unListsMutation = useUnListsMutation();
  const resetStack = useHistoryStore((state) => state.resetStack);

  const closeModal = () => {
    dispatchModal({ type: 'reset' });
  };

  const unListHandler = () => {
    if (!modal.unLists) return;
    if (!session?.user?.email) return;

    unListsMutation.mutate(
      {
        queryClient,
        listId: modal.unLists.id,
        sessionId: session.user.email,
      },
      {
        onSuccess: () => {
          resetStack();
          dispatchModal({ type: 'reset' });
          router.replace(`/${session.user?.email}/lists`);
        },
        onError: () => {
          alterMessage('something is wrong. please try again.');
        },
      }
    );
  };

  return (
    <ConfirmModal
      title="Delete List?"
      sub="This can’t be undone and you’ll lose your List."
      btnText="Delete"
      btnTheme="red"
      onClickOutSide={closeModal}
      onClickConfirm={unListHandler}
      onClickCancle={closeModal}
    />
  );
}
