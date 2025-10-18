'use client';

import styles from './searchHeader.module.css';
import cx from 'classnames';
import BackButton from '@/app/(afterLogin)/_component/buttons/BackButton';
import SearchForm from '@/app/(afterLogin)/_component/search/SearchForm';
import OptionButton from '@/app/(afterLogin)/_component/buttons/OptionButton';
import SearchTab from '@/app/(afterLogin)/search/_component/_header/SearchTab';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import { MouseEventHandler, useContext } from 'react';
import useMobileHeader from '@/app/_hooks/useMobileHeader';

export default function SearchHeader() {
  const { dispatchMenu } = useContext(SubMenuContext);
  const { dir, transitClass } = useMobileHeader();

  const onClickOption: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
    dispatchMenu({
      type: 'set',
      payload: {
        flag: true,
        status: {
          type: 'search_option',
        },
        position: { x, y, width, height, target: e.currentTarget },
      },
    });
  };

  return (
    <section
      className={cx(styles.header, transitClass, dir === 'down' && styles.hide)}
    >
      <div className={styles.form}>
        <BackButton />
        <SearchForm className={styles.bar} />
        <div className={styles.options}>
          <OptionButton onClick={onClickOption} />
        </div>
      </div>
      <SearchTab />
    </section>
  );
}
