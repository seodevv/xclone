'use client';

import IListHeader from '@/app/(afterLogin)/@i/(.)i/lists/_component/IListHeader';
import useListsStore from '@/app/(afterLogin)/_store/ListsStore';

export default function LIstsMembersHeader() {
  const suggested = useListsStore((state) => state.suggested);

  return (
    <IListHeader title={suggested ? 'Manage members' : 'List members'} noBtn />
  );
}
