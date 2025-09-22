import ListsSearchHeader from '@/app/(afterLogin)/i/lists/search/_component/ListsSearchHeader';

interface Props {
  children: React.ReactNode;
}

export default function IListsSearchLayout({ children }: Props) {
  return (
    <main>
      <ListsSearchHeader />
      {children}
    </main>
  );
}
