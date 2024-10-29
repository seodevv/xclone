'use client';

import useListsUpdateMutation from '@/app/(afterLogin)/@i/(.)i/lists/[listid]/_hooks/useListsUpdateMutation';
import IListHeader from '@/app/(afterLogin)/@i/(.)i/lists/_component/IListHeader';
import { IListsContext } from '@/app/(afterLogin)/@i/(.)i/lists/create/_provider/IListsProvider';
import useListsStore from '@/app/(afterLogin)/_store/ListsStore';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { generateImagePath, IMAGE_DEFAULT_LISTS } from '@/app/_lib/common';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export default function IListsInfoHeader() {
  const { lists, reset } = useListsStore((state) => ({
    lists: state.lists,
    reset: state.reset,
  }));
  const { state } = useContext(IListsContext);
  const [disabled, setDisabled] = useState({
    name: true,
    description: true,
    make: true,
    banner: true,
  });

  const router = useRouter();
  const { alterMessage } = useAlterModal();
  const queryClient = useQueryClient();
  const listsUpdateMutation = useListsUpdateMutation();
  const onClickSave = () => {
    if (!lists) return;

    const name = !disabled.name ? state.name : undefined;
    const description = !disabled.description ? state.description : undefined;
    const make = !disabled.make ? state.make : undefined;
    const banner = !disabled.banner
      ? state.image.banner
        ? state.image.banner
        : state.image.origin
      : undefined;
    const thumbnail = !disabled.banner ? state.image.thumbnail : undefined;
    const def = state.image.link === IMAGE_DEFAULT_LISTS;

    listsUpdateMutation.mutate(
      {
        queryClient,
        listid: lists.id,
        name,
        description,
        make,
        banner,
        thumbnail,
        def,
      },
      {
        onSuccess: () => {
          reset();
          router.back();
        },
        onError: () => {
          alterMessage('Something is wrong. Please try again.');
        },
      }
    );
  };

  useEffect(() => {
    if (lists) {
      const name = state.name === lists.name;
      const description = state.description === lists.description;
      const make = state.make === lists.make;
      const banner = state.image.link === generateImagePath(lists.banner);
      setDisabled({ name, description, make, banner });
    }
  }, [lists, state, setDisabled]);

  if (state.phase !== 'create') return null;

  return (
    <IListHeader
      title="Edit List"
      disabled={Object.values(disabled).every((v) => v)}
      onClickXMark={() => reset()}
      onClick={onClickSave}
    />
  );
}
