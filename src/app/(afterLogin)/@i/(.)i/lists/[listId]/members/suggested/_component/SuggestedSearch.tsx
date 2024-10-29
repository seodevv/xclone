'use client';

import SuggestedResult from '@/app/(afterLogin)/@i/(.)i/lists/[listid]/members/suggested/_component/SuggestedResult';
import SuggestedSearchBar from '@/app/(afterLogin)/@i/(.)i/lists/[listid]/members/suggested/_component/SuggestedSearchBar';
import useGetSingleListsQuery from '@/app/(afterLogin)/i/lists/[listid]/_hooks/useGetSingleListsQuery';

interface Props {
  listid: string;
}

export default function SuggestedSearch({ listid }: Props) {
  const { data: lists, isError, error } = useGetSingleListsQuery(listid);

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
