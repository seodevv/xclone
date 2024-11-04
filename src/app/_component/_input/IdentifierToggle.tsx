'use client';

import styles from './toggle.module.css';
import cx from 'classnames';
import { ChangeEventHandler, useLayoutEffect, useState } from 'react';

import Text from '@/app/_component/_text/Text';

export interface IToggle {
  id: number;
  title: string | JSX.Element;
  sub?: string | JSX.Element;
  defaultValue?: boolean;
}

interface Props {
  title: string | JSX.Element;
  sub?: string | JSX.Element;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
}

export default function IdentifierToggle({
  title,
  sub,
  defaultValue,
  onChange,
}: Props) {
  const [check, setCheck] = useState(false);
  const onChangeCheck: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCheck(e.target.checked);
    if (typeof onChange === 'function') {
      onChange(e.target.checked);
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
      <Text theme="gray" size="xs">
        {sub}
      </Text>
    </label>
  );
}
