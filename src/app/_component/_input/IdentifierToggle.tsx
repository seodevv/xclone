'use client';

import styles from './toggle.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useState,
} from 'react';

import Text from '@/app/_component/_text/Text';

export interface IToggle {
  id: number;
  title: string | JSX.Element;
  sub?: string | JSX.Element;
  defaultValue?: boolean;
  onToggleOn?: (
    check: boolean,
    setCheck: Dispatch<SetStateAction<boolean>>
  ) => void;
  onToogleOff?: (
    check: boolean,
    setCheck: Dispatch<SetStateAction<boolean>>
  ) => void;
  onChange?: (value: boolean) => void;
}

type Props = Omit<IToggle, 'id'>;

export default function IdentifierToggle({
  title,
  sub,
  defaultValue,
  onToggleOn,
  onToogleOff,
  onChange,
}: Props) {
  const [check, setCheck] = useState(false);
  const onChangeCheck: ChangeEventHandler<HTMLInputElement> = (e) => {
    const checked = e.target.checked;
    if (typeof onChange === 'function') {
      onChange(checked);
    }

    if (checked && typeof onToggleOn === 'function') {
      onToggleOn(checked, setCheck);
    } else if (!checked && typeof onToogleOff === 'function') {
      onToogleOff(checked, setCheck);
    } else {
      setCheck(e.target.checked);
    }
  };

  useLayoutEffect(() => {
    if (typeof defaultValue !== 'undefined') {
      setCheck(defaultValue);
    }
  }, [defaultValue]);

  return (
    <label className={styles.label}>
      <div className={styles.top}>
        <Text bold="bold">{title}</Text>
        <div className={styles.toggle}>
          <div className={cx(styles.bar, check && styles.checked)}></div>
          <div className={cx(styles.circle, check && styles.checked)}></div>
          <input
            className={styles.input}
            type="checkbox"
            hidden
            checked={check}
            onChange={onChangeCheck}
          />
        </div>
      </div>
      <Text className={utils.pt_4} theme="gray" size="xs">
        {sub}
      </Text>
    </label>
  );
}
