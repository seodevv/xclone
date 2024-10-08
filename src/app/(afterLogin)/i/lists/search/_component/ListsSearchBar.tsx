'use client';

import styles from './listsSearch.bar.module.css';
import SearchForm from '@/app/(afterLogin)/_component/search/SearchForm';
import Link from 'next/link';
import NewListsSvg from '@/app/_svg/lists/NewListsSvg';
import OptionButton from '@/app/(afterLogin)/_component/buttons/OptionButton';
import { MouseEventHandler, useContext } from 'react';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';

interface Props {
  q?: string;
  options?: boolean;
}

export default function ListsSearchBar({ q, options }: Props) {
  const { dispatchMenu } = useContext(SubMenuContext);

  const onClickSearchListsOptions: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
    dispatchMenu({
      type: 'set',
      payload: {
        flag: true,
        status: 'searchListsOption',
        position: {
          x,
          y,
          width,
          height,
          target: e.currentTarget,
        },
      },
    });
  };

  return (
    <div className={styles.searchHeader}>
      <div className={styles.searchLists}>
        <SearchForm
          path="/i/lists/search"
          placeHolder="Search Lists"
          style={{ margin: 0 }}
        />
      </div>
      {options && (
        <div className={styles.searchOptions}>
          <Link className={styles.create} href="/i/lists/create" scroll={false}>
            <NewListsSvg width={20} white />
          </Link>
          <OptionButton white onClick={onClickSearchListsOptions} />
        </div>
      )}
    </div>
  );
}
