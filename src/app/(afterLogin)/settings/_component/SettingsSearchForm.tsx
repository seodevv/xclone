'use client';

import SearchSvg from '@/app/_svg/search/SearchSvg';
import styles from './settings.search.module.css';
import ArrowButton from '@/app/(afterLogin)/_component/buttons/ArrowButton';
import { ChangeEventHandler, MouseEventHandler, useRef, useState } from 'react';
import ClearSvg from '@/app/_svg/search/ClearSvg';

export default function SettingsSearchForm() {
  const [search, setSearch] = useState({
    value: '',
    clear: false,
    focus: false,
  });
  const searchRef = useRef<HTMLInputElement>(null);

  const onClickBack: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setSearch((prev) => ({ ...prev, value: '', clear: false }));
  };
  const onChangeSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch({ value: e.target.value, clear: true, focus: true });
  };
  const onClickClear: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setSearch((prev) => ({ ...prev, value: '' }));
    searchRef.current?.focus();
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      {search.clear && (
        <ArrowButton className={styles.back} onClick={onClickBack} />
      )}
      <div className={styles.bar}>
        <div className={styles.border}>
          <div className={styles.rens}>
            <SearchSvg width={16} />
          </div>
          <div className={styles.search}>
            <input
              className={styles.input}
              ref={searchRef}
              placeholder="Search Settings"
              value={search.value}
              onChange={onChangeSearch}
              onFocus={() => setSearch((prev) => ({ ...prev, focus: true }))}
              onBlur={() =>
                setTimeout(
                  () => setSearch((prev) => ({ ...prev, focus: false })),
                  100
                )
              }
            />
          </div>
          {search.value !== '' && search.focus && (
            <div className={styles.clear}>
              <button className={styles.xmark} onClick={onClickClear}>
                <ClearSvg width={22} white />
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
