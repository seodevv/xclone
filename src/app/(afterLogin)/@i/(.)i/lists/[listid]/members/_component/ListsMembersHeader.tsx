'use client';

import IListHeader from '@/app/(afterLogin)/@i/(.)i/lists/_component/IListHeader';
import useListsStore from '@/app/(afterLogin)/_store/ListsStore';
import { useRouter } from 'next/navigation';

interface Props {
  listid: string;
}

export default function LIstsMembersHeader({ listid }: Props) {
  const router = useRouter();
  const suggested = useListsStore((state) => state.suggested);

  const onClickDone = () => {
    router.replace(`/i/lists/${listid}`);
  };

  return (
    <IListHeader
      title={suggested ? 'Manage members' : 'List members'}
      btnText="Done"
      onClick={onClickDone}
    />
  );
}
