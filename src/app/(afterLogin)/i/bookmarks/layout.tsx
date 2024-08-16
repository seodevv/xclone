import { getServerSession } from 'next-auth';
import authOptions from '@/app/_lib/authOptions';
import BookmarkHeader from '@/app/(afterLogin)/i/bookmarks/_component/BookmarkHeader';
import BookmarkSearch from '@/app/(afterLogin)/i/bookmarks/_component/BookmarkSearch';
import BookmarkProvider from '@/app/(afterLogin)/i/bookmarks/_provider/BookmarkProvider';

interface Props {
  children: React.ReactNode;
}

export default async function IBookmarksLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <BookmarkProvider>
        <BookmarkHeader session={session} />
        <BookmarkSearch />
        {children}
      </BookmarkProvider>
    </main>
  );
}
