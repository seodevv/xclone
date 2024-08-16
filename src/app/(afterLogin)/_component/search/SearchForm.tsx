'use client';

import styles from './searchForm.module.css';
import {
  ChangeEventHandler,
  CSSProperties,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import cx from 'classnames';
import SearchSvg from '@/app/_svg/search/SearchSvg';
import CloseButton from '../buttons/CloseButton';

interface Props {
  className?: string;
  style?: CSSProperties;
  autoFocus?: boolean;
}

export default function SearchForm({
  className,
  style,
  autoFocus = false,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get('q');
  const [search, setSearch] = useState(q ? decodeURIComponent(q) : '');
  const [focus, setFocus] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
    if (!e.target.value) {
      setFocus(false);
    } else {
      setFocus(true);
    }
  };
  const onSubmitSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (search) {
      const writetableSearchParams = new URLSearchParams(searchParams);
      writetableSearchParams.set('q', encodeURIComponent(search));
      router.push(`/search?${writetableSearchParams.toString()}`);
    }
  };

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (q) {
      setSearch(decodeURIComponent(q));
    }
  }, [q, setSearch]);

  return (
    <form
      ref={formRef}
      className={cx(styles.search, focus && styles.searchFocus, className)}
      style={style}
      onSubmit={onSubmitSearch}
    >
      <SearchSvg />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        spellCheck={false}
        value={search}
        onChange={onChangeSearch}
        onFocus={() => {
          if (!search) return;
          setFocus(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setFocus(false);
          }, 100);
        }}
      />
      <CloseButton
        width={16}
        isSearch
        isVisible={focus}
        onClick={() => {
          setSearch('');
          setFocus(false);
          inputRef.current?.focus();
        }}
      />
    </form>
  );
}
