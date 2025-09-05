'use client';

import styles from './messages.search.module.css';
import SearchSvg from '@/app/_svg/search/SearchSvg';
import Text from '@/app/_component/_text/Text';
import {
  ChangeEventHandler,
  FocusEventHandler,
  FormEventHandler,
  useContext,
  useLayoutEffect,
  useRef,
} from 'react';
import ClearSvg from '@/app/_svg/search/ClearSvg';
import LeftArrowSvg from '@/app/_svg/arrow/LeftArrowSvg';
import { MessagesSearchContext } from '@/app/(afterLogin)/messages/_component/_body/_search/_provider/MessagesSearchProvider';

interface Props {}

export default function MessagesSearchBar({}: Props) {
  const { input, active, focus, set } = useContext(MessagesSearchContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    inputRef.current?.blur();
  };
  const onClickBack = () => {
    set({ active: false, input: '', enabled: true });
  };
  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    set({ input: e.target.value, enabled: false });

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      set({ enabled: true });
    }, 300);
  };
  const onFocusInput: FocusEventHandler<HTMLInputElement> = (e) => {
    set({ active: true });
  };
  const onClickClear = () => {
    set({ input: '' });
    inputRef.current?.focus();
  };

  useLayoutEffect(() => {
    if (focus) {
      inputRef.current?.focus();
      set({ focus: false });
    }
  }, [focus]);

  return (
    <form className={styles.form} onSubmit={onSubmitForm}>
      {active && (
        <button type="button" className={styles.back} onClick={onClickBack}>
          <LeftArrowSvg width={19} theme="theme" />
        </button>
      )}
      <div className={styles.border}>
        <div className={styles.borderInner}>
          <div className={styles.search}>
            <div className={styles.svg}>
              <SearchSvg width={15} />
            </div>
            <div className={styles.inputBox}>
              <Text size="s">
                <input
                  className={styles.input}
                  ref={inputRef}
                  placeholder="Search Direct Messages"
                  value={input}
                  onChange={onChangeInput}
                  onFocus={onFocusInput}
                />
              </Text>
            </div>
            {input !== '' && (
              <div className={styles.clearBox}>
                <button
                  type="button"
                  className={styles.clear}
                  onClick={onClickClear}
                >
                  <ClearSvg width={21} white />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
