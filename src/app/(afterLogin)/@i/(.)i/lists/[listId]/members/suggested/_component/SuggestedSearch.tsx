'use client';

import SuggestedResult from '@/app/(afterLogin)/@i/(.)i/lists/[listId]/members/suggested/_component/SuggestedResult';
import SuggestedSearchBar from '@/app/(afterLogin)/@i/(.)i/lists/[listId]/members/suggested/_component/SuggestedSearchBar';
import useGetSingleListsQuery from '@/app/(afterLogin)/i/lists/[listId]/_hooks/useGetSingleListsQuery';

interface Props {
  listId: string;
}

export default function SuggestedSearch({ listId }: Props) {
  const { data: lists, isError, error } = useGetSingleListsQuery(listId);

  if (lists) {
    return (
      <>
        <SuggestedSearchBar />
        <SuggestedResult lists={lists.data} />
      </>
    );
  }

  if (isError) {
    throw error;
  }

  return null;
}
