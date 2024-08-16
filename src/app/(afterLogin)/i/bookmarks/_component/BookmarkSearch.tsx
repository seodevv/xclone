'use client';

import {
  ChangeEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './i.bookmarks.search.module.css';
import SearchSvg from '@/app/_svg/search/SearchSvg';
import { BookmarkContext } from '@/app/(afterLogin)/i/bookmarks/_provider/BookmarkProvider';

export default function BookmarkSearch() {
  const { dispatch } = useContext(BookmarkContext);
  const [search, setSearch] = useState('');
  const placeholder = 'Search Bookmarks';

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        dispatch({ type: 'setLoading' });
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          dispatch({ type: 'setSearch', payload: search });
        }, 1000);
      } else {
        dispatch({ type: 'reset' });
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [search, dispatch]);

  return (
    <div className={styles.search}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.icon}>
            <SearchSvg width={16} />
          </div>
          <div className={styles.inputBox}>
            <input
              className={styles.input}
              value={search}
              onChange={onChangeInput}
              placeholder={placeholder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
