'use client';

import IListHeader from '@/app/(afterLogin)/@i/(.)i/lists/_component/IListHeader';
import useListsPostMutation from '@/app/(afterLogin)/@i/(.)i/lists/add_member/_hooks/useListsPostMutation';
import { AddMemberContext } from '@/app/(afterLogin)/@i/(.)i/lists/add_member/_provider/AddMemberProvider';
import useListsStore from '@/app/(afterLogin)/_store/ListsStore';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

export default function AddMemberHeader() {
  const router = useRouter();
  const { state } = useContext(AddMemberContext);
  const postId = useListsStore((state) => state.postId);
  const queryClient = useQueryClient();
  const postMutation = useListsPostMutation();

  const onClickSave = () => {
    if (state.disabled) return;
    if (!postId) return;

    state.included.forEach((listId) => {
      postMutation.mutate({
        queryClient,
        method: 'post',
        listId,
        postId,
      });
    });

    state.excluded.forEach((listId) => {
      postMutation.mutate({
        queryClient,
        method: 'delete',
        listId,
        postId,
      });
    });

    router.back();
  };

  return (
    <IListHeader
      title="Pick a List"
      onClick={onClickSave}
      disabled={state.disabled}
    />
  );
}
