'use client';

import styles from './suggested.search.module.css';
import SearchSvg from '@/app/_svg/search/SearchSvg';
import ClearSvg from '@/app/_svg/search/ClearSvg';
import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useContext,
  useRef,
  useState,
} from 'react';
import { SuggestedContext } from '@/app/(afterLogin)/@i/(.)i/lists/[listid]/members/suggested/_provider/SuggestedProvider';

export default function SuggestedSearchBar() {
  const [input, setInput] = useState('');
  const { search, setSearch } = useContext(SuggestedContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const placeholder = 'Search people';
  const timer = 300;

  const onSubmitSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSearch(e.target.value);
    }, timer);
  };

  const onClickClear: MouseEventHandler<HTMLButtonElement> = (e) => {
    setInput('');
    setSearch('');
    inputRef.current?.focus();
  };

  return (
    <form className={styles.searchBar} onSubmit={onSubmitSearch}>
      <div className={styles.border}>
        <div className={styles.inner}>
          <div className={styles.icon}>
            <SearchSvg width={16} />
          </div>
          <div className={styles.inputBox}>
            <input
              className={styles.input}
              ref={inputRef}
              value={input}
              placeholder={placeholder}
              onChange={onChangeInput}
            />
          </div>
          {search !== '' && (
            <button
              className={styles.clear}
              type="button"
              onClick={onClickClear}
            >
              <ClearSvg width={22} inherit />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
