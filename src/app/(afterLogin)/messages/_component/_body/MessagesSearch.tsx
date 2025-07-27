'use client';

import styles from './messages.search.module.css';
import SearchSvg from '@/app/_svg/search/SearchSvg';
import Text from '@/app/_component/_text/Text';
import {
  Dispatch,
  FocusEventHandler,
  FormEventHandler,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import ClearSvg from '@/app/_svg/search/ClearSvg';
import LeftArrowSvg from '@/app/_svg/arrow/LeftArrowSvg';

interface Props {
  active?: boolean;
  setActive?: Dispatch<SetStateAction<boolean>>;
  onFocus?: () => void;
}

export default function MessagesSearch({ active, setActive, onFocus }: Props) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };
  const onFocusInput: FocusEventHandler<HTMLInputElement> = (e) => {
    if (typeof onFocus === 'function') {
      onFocus();
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmitForm}>
      {active && (
        <button
          type="button"
          className={styles.back}
          onClick={() => {
            if (typeof setActive === 'function') {
              setActive(false);
            }
          }}
        >
          <LeftArrowSvg width={19} white />
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
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={onFocusInput}
                />
              </Text>
            </div>
            {input !== '' && (
              <div className={styles.clearBox}>
                <button
                  type="button"
                  className={styles.clear}
                  onClick={() => {
                    setInput('');
                    inputRef.current?.focus();
                  }}
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
