'use client';

import styles from './listsCreator.header.module.css';
import IListHeader from '@/app/(afterLogin)/@i/(.)i/lists/_component/IListHeader';
import useAddListsMutation from '@/app/(afterLogin)/@i/(.)i/lists/create/_hooks/useAddListsMutation';
import { IListsContext } from '@/app/(afterLogin)/@i/(.)i/lists/create/_provider/IListsProvider';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import useListsStore from '@/app/(afterLogin)/_store/ListsStore';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { useQueryClient } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

interface Props {
  session: Session;
}

export default function IListCreateHeader({ session }: Props) {
  const router = useRouter();
  const { state } = useContext(IListsContext);
  const { alterMessage } = useAlterModal();
  const setSuggested = useListsStore((state) => state.setSuggested);
  const queryClient = useQueryClient();
  const addListsMutation = useAddListsMutation();
  const [loading, setLoading] = useState(false);

  const onClickNext = () => {
    if (state.disabled) {
      return;
    }

    setLoading(true);
    addListsMutation.mutate(
      {
        queryClient,
        session: {
          id: session.user?.email as string,
          nickname: session.user?.name as string,
          image: session.user?.image as string,
          verified: null,
        },
        name: state.name,
        description: state.description,
        make: state.make,
        banner: state.image.banner ? state.image.banner : state.image.origin,
        thumbnail: state.image.thumbnail,
      },
      {
        onSuccess(response) {
          const listid = response.data.id;
          setSuggested(true);
          router.replace(`/i/lists/${listid}/members/suggested`);
        },
        onError: (error) => {
          console.error(error);
          alterMessage('something is wrong. please try again', 'error');
          setLoading(false);
        },
      }
    );
  };

  if (state.phase !== 'create') return null;

  return (
    <>
      <IListHeader
        title="Create a new List"
        btnText="Next"
        disabled={state.disabled}
        onClick={onClickNext}
      />
      {loading && (
        <div className={styles.loading}>
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}
