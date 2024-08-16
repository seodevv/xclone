'use client';

import getBookmarks from '@/app/(afterLogin)/i/bookmarks/_lib/getBookmarks';
import { useInfiniteQuery } from '@tanstack/react-query';

const useBookmarkPostsQuery = () =>
  useInfiniteQuery({
    queryKey: ['posts', 'list', 'bookmarks'],
    queryFn: getBookmarks,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

export default useBookmarkPostsQuery;
