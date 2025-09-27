'use client';

import SearchSvg from '@/app/_svg/search/SearchSvg';
import styles from './messagesCompose.body.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import {
  ChangeEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { MessagesComposeContext } from '@/app/(afterLogin)/@modal/(.)messages/compose/_provider/MessagesComposeProvider';

export default function MessagesComposeSearch() {
  const { search, setSearch, setEnabled, getUsers } = useContext(
    MessagesComposeContext
  );
  const [focus, setFocus] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const users = getUsers();

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
    setEnabled(false);

    if (timer.current) {
      clearTimeout(timer.current);
    }
    if (e.target.value !== '') {
      timer.current = setTimeout(() => {
        setEnabled(true);
      }, 300);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [users]);

  return (
    <div className={cx(utils.d_flexColumn)}>
      <div className={cx(utils.d_flexRow, utils.flex_1, utils.cursor_text)}>
        <div
          className={cx(
            utils.d_flexColumn,
            utils.flex_justiCenter,
            utils.cursor_default,
            styles.gray,
            focus && styles.primary
          )}
        >
          <SearchSvg
            className={cx(utils.ml_11, styles.svg)}
            width={17.5}
            height={17.5}
            theme="inherit"
          />
        </div>
        <div className={cx(utils.d_flexRow, utils.flexGrow_1)}>
          <input
            ref={inputRef}
            className={styles.input}
            placeholder="Search people"
            value={search}
            autoFocus
            onChange={onChangeInput}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </div>
      </div>
    </div>
  );
}
