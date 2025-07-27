'use client';

import styles from './iList.addMemberLists.module.css';
import NoLists from '@/app/(afterLogin)/@i/(.)i/lists/add_member/_component/_body/NoLists';
import Link from 'next/link';
import Lists from '@/app/(afterLogin)/@i/(.)i/lists/_component/Lists';
import { useContext, useEffect } from 'react';
import { AddMemberContext } from '@/app/(afterLogin)/@i/(.)i/lists/add_member/_provider/AddMemberProvider';
import { AdvancedLists } from '@/model/Lists';
import PageLoading from '@/app/(afterLogin)/_component/loading/PageLoading';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import DisConnection from '@/app/(afterLogin)/_component/error/DisConnection';
import useListsStore from '@/app/(afterLogin)/_store/ListsStore';
import useGetUserListsQuery from '@/app/(afterLogin)/@i/(.)i/lists/add_member/_hooks/useGetUserListsQuery';

interface Props {
  username: string;
  filter: 'own' | 'all';
}

export default function AddMemberLists({ username, filter }: Props) {
  const {
    data: lists,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    isError,
    fetchNextPage,
    refetch,
  } = useGetUserListsQuery({ username, filter });
  const { state, dispatch } = useContext(AddMemberContext);
  const postid = useListsStore((state) => state.postid);

  const onClickLists = (id: AdvancedLists['id']) => {
    dispatch({
      type: state.selected.includes(id) ? 'removeList' : 'addList',
      payload: id,
    });
  };

  useEffect(() => {
    if (lists && postid) {
      lists.pages.forEach((page) =>
        page.data.forEach((lists) => {
          if (lists.Posts.includes(postid)) {
            dispatch({ type: 'setInitial', payload: lists.id });
          }
        })
      );
    }
  }, [lists, postid, dispatch]);

  if (lists) {
    if (lists.pages[0].data?.length === 0) {
      return <NoLists />;
    }

    return (
      <div className={styles.container}>
        <Link className={styles.createList} href="/i/lists/create">
          <div>Create a new List</div>
        </Link>
        {lists.pages.map((page) =>
          page.data.map((lists) => (
            <Lists
              key={lists.id}
              lists={lists}
              checked={state.selected.includes(lists.id)}
              onClick={() => onClickLists(lists.id)}
            />
          ))
        )}
        <PageLoading
          type="next"
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isError={isError}
          fetchNextPage={fetchNextPage}
          refetch={refetch}
        />
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <DisConnection onClick={() => refetch()} />;
  }

  return null;
}
