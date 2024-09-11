'use client';

import { useContext } from 'react';
import { IListsContext } from '@/app/(afterLogin)/@i/(.)i/lists/create/_provider/IListsProvider';
import ListsCreator from '@/app/(afterLogin)/@i/(.)i/lists/create/_component/_creator/ListsCreator';
import ListsBannerEditor from '@/app/(afterLogin)/@i/(.)i/lists/create/_component/_editor/ListsBannerEditor';
import ListsThumbnailEditor from '@/app/(afterLogin)/@i/(.)i/lists/create/_component/_editor/ListsThumbnailEditor';

export default function ListsCreatePhase() {
  const { state } = useContext(IListsContext);

  if (state.phase === 'create') {
    return <ListsCreator />;
  }

  if (state.phase === 'banner') {
    return <ListsBannerEditor />;
  }

  if (state.phase === 'thumbnail') {
    return <ListsThumbnailEditor />;
  }

  return null;
}
