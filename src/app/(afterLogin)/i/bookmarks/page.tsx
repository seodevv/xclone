import utils from '@/app/utility.module.css';
import BookmarkHydrationBoundary from '@/app/(afterLogin)/i/bookmarks/_component/BookmarkHydrationBoundary';
import BookmarkPosts from '@/app/(afterLogin)/i/bookmarks/_component/BookmarkPosts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'XClone',
};

export default async function IBookmarksPage() {
  return (
    <BookmarkHydrationBoundary>
      <main className={utils.h_min_100dvh}>
        <BookmarkPosts />
      </main>
    </BookmarkHydrationBoundary>
  );
}
