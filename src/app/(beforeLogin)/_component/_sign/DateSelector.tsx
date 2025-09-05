import styles from './beforeLogin.selector.module.css';
import {
  captialCase,
  getDaysArray,
  getMonthsArray,
  getYearsArray,
  MONTH_EN,
} from '@/app/_lib/common';
import cx from 'classnames';
import DownArrowSvg from '@/app/_svg/arrow/DownArrowSvg';
import {
  ChangeEventHandler,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { BirthRef } from '@/app/(beforeLogin)/_component/_sign/BirthSelector';

interface Props {
  type: 'year' | 'month' | 'day';
  defaultValue?: number;
  date?: Date;
  callback?: (value: number) => void;
  disabled?: boolean;
}

const DateSelector = forwardRef<BirthRef, Props>(
  ({ type, defaultValue, date = new Date(), callback, disabled }, ref) => {
    const [value, setValue] = useState(defaultValue || 0);
    const selectRef = useRef<HTMLSelectElement>(null);

    const data =
      type === 'year'
        ? getYearsArray()
        : type === 'month'
        ? getMonthsArray()
        : getDaysArray(date);

    const onChangeOption: ChangeEventHandler<HTMLSelectElement> = (e) => {
      setValue(~~e.target.value);
      if (typeof callback === 'function') {
        callback(~~e.target.value);
      }
    };

    useImperativeHandle(ref, () => ({
      focus: () => {
        selectRef.current?.focus();
      },
      blur: () => {
        selectRef.current?.blur();
      },
    }));

    return (
      <div className={cx(styles.date, styles[type])}>
        <label className={styles.label}>
          <span>{captialCase(type)}</span>
        </label>
        <select
          ref={selectRef}
          className={styles.select}
          onChange={onChangeOption}
          value={value}
          disabled={disabled}
        >
          <option className={styles.option} value={0} disabled></option>
          {data.map((v) => {
            if (typeof v !== 'number') return null;
            return (
              <option key={v} className={styles.option} value={v}>
                {type === 'month' ? MONTH_EN[v - 1] : v}
              </option>
            );
          })}
        </select>
        <DownArrowSvg className={styles.arrow} width={22.5} />
        {disabled && <div className={styles.disabled}></div>}
      </div>
    );
  }
);

DateSelector.displayName = 'DateSelector';
export default DateSelector;
