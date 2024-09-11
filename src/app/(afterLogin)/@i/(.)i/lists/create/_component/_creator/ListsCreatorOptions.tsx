'use client';

import styles from './options.module.css';
import cx from 'classnames';
import { ChangeEventHandler, useContext } from 'react';
import CheckSvg from '@/app/_svg/input/CheckSvg';
import { IListsContext } from '@/app/(afterLogin)/@i/(.)i/lists/create/_provider/IListsProvider';

export default function ListsCreatorOptions() {
  const { state, dispatch } = useContext(IListsContext);
  const checked = state.make === 'private';

  const onChangeCheck: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch({
      type: 'setMake',
      payload: e.target.checked ? 'private' : 'public',
    });
  };

  return (
    <div className={styles.options}>
      <label className={styles.label}>
        <div className={styles.field}>
          <span>Make private</span>
        </div>
        <div className={styles.private}>
          <div className={cx(styles.checkBox, checked && styles.checked)}>
            {checked && <CheckSvg white />}
          </div>
        </div>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChangeCheck}
          hidden
        />
      </label>
      <div className={styles.desc}>
        <span>When you make a List private, only you can see it.</span>
      </div>
    </div>
  );
}
