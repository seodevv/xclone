import BookmarkHydrationBoundary from '@/app/(afterLogin)/i/bookmarks/_component/BookmarkHydrationBoundary';
import BookmarkPosts from '@/app/(afterLogin)/i/bookmarks/_component/BookmarkPosts';

export default async function IBookmarksPage() {
  return (
    <BookmarkHydrationBoundary>
      <main>
        <BookmarkPosts />
      </main>
    </BookmarkHydrationBoundary>
  );
}
