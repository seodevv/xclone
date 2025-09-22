import stylse from './listsSearch.header.module.css';
import BackButton from '@/app/(afterLogin)/_component/buttons/BackButton';
import ListsSearchBar from '@/app/(afterLogin)/i/lists/search/_component/ListsSearchBar';

interface Props {
  // searchParams: { q?: string };
}

export default function ListsSearchHeader({}: Props) {
  return (
    <div className={stylse.header}>
      <BackButton />
      <ListsSearchBar />
    </div>
  );
}
