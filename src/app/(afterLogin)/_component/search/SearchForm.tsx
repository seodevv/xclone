'use client';

import style from './search.module.css';
import SearchSvg from '@/app/_svg/search/SearchSvg';
import { useRouter } from 'next/navigation';
import { FormEventHandler } from 'react';

interface Props {
  q?: string;
}

export default function SearchForm({ q }: Props) {
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const search: string = e.currentTarget.search.value;
    if (search) {
      router.push(`/search?q=${search}`);
    }
  };

  return (
    <form className={style.search} onSubmit={onSubmit}>
      <SearchSvg />
      <input type="search" name="search" placeholder="Search" />
    </form>
  );
}
