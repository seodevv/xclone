'use client';

import {
  forwardRef,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styles from './beforeLogin.selector.module.css';
import DateSelector from './DateSelector';
import { getLastDay } from '@/app/_lib/common';
import { IdentifierInputRef } from '@/app/_component/_input/IdentifierInput';

interface Props {
  defaultValue?: string;
  onSuccess?: (date: Date) => void;
  disabled?: boolean;
}

interface Status {
  [key: string]: { disabled: boolean; ref: RefObject<IdentifierInputRef> };
}

const BirthSelector = forwardRef<IdentifierInputRef, Props>(
  ({ defaultValue, onSuccess, disabled }, ref) => {
    const [date, setDate] = useState(new Date(defaultValue || Date.now()));
    const status = useRef<Status>({
      a: { disabled: !!defaultValue, ref: useRef<IdentifierInputRef>(null) },
      b: { disabled: !!defaultValue, ref: useRef<IdentifierInputRef>(null) },
      c: { disabled: !!defaultValue, ref: useRef<IdentifierInputRef>(null) },
    });

    const checkDate = ({
      type,
      value,
    }: {
      type: 'month' | 'year';
      value: number;
    }) => {
      const temp =
        type === 'month'
          ? new Date(date.getFullYear(), value - 1)
          : new Date(value, date.getMonth());
      const prevDate = date.getDate();
      const nextLastDate = getLastDay(temp);

      if (prevDate > nextLastDate) {
        setDate(
          type === 'month'
            ? new Date(
                date.getFullYear(),
                value - 1,
                date.getDate() - nextLastDate
              )
            : new Date(value, date.getMonth(), prevDate - nextLastDate)
        );
        status.current.b.disabled = false;
      } else {
        setDate(
          type === 'month'
            ? new Date(date.getFullYear(), value - 1, date.getDate())
            : new Date(value, date.getMonth(), prevDate)
        );
      }
    };

    useEffect(() => {
      if (Object.values(status.current).every((v) => v.disabled)) {
        if (typeof onSuccess === 'function') {
          onSuccess(date);
        }
      }
    }, [date]);

    useImperativeHandle(ref, () => ({
      focus: () => {
        status.current.a.ref.current?.focus();
      },
      blur: () => {
        status.current.a.ref.current?.blur();
      },
    }));

    return (
      <div className={styles.birthSelector}>
        <DateSelector
          ref={status.current.a.ref}
          type="month"
          defaultValue={defaultValue ? date.getMonth() + 1 : undefined}
          callback={(v) => {
            checkDate({ type: 'month', value: v });
            status.current.a.disabled = v === 0 ? false : true;
          }}
          disabled={disabled}
        />
        <DateSelector
          ref={status.current.b.ref}
          type="day"
          defaultValue={defaultValue ? date.getDate() : undefined}
          date={date}
          callback={(v) => {
            setDate(() => new Date(date.setDate(v)));
            status.current.b.disabled = v === 0 ? false : true;
          }}
          disabled={disabled}
        />
        <DateSelector
          ref={status.current.c.ref}
          type="year"
          defaultValue={defaultValue ? date.getFullYear() : undefined}
          callback={(v) => {
            checkDate({ type: 'year', value: v });
            status.current.c.disabled = v === 0 ? false : true;
          }}
          disabled={disabled}
        />
      </div>
    );
  }
);

BirthSelector.displayName = 'BirthSelector';
export default BirthSelector;
