import utils from '@/app/utility.module.css';
import BookmarkHydrationBoundary from '@/app/(afterLogin)/i/bookmarks/_component/BookmarkHydrationBoundary';
import BookmarkPosts from '@/app/(afterLogin)/i/bookmarks/_component/BookmarkPosts';
import { Metadata } from 'next';
import FooterController from '@/app/(afterLogin)/_component/_footer/FooterController';

export const metadata: Metadata = {
  title: 'XClone',
};

export default async function IBookmarksPage() {
  return (
    <BookmarkHydrationBoundary>
      <main className={utils.h_min_100dvh}>
        <BookmarkPosts />
      </main>
      <FooterController type="post" />
    </BookmarkHydrationBoundary>
  );
}
