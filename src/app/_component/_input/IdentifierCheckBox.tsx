'use client';

import styles from './checkbox.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import Text from '@/app/_component/_text/Text';
import CheckSvg from '@/app/_svg/input/CheckSvg';
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useLayoutEffect,
  useState,
} from 'react';

export interface ICheckBox {
  id: number;
  title: string | JSX.Element;
  sub?: string | JSX.Element;
  defaultValue?: boolean;
  disable?: boolean;
  noPad?: boolean;
  noMargin?: boolean;
  onCheck?: (
    check: boolean,
    setCheck: Dispatch<SetStateAction<boolean>>
  ) => void;
  onUnCheck?: (
    check: boolean,
    setCheck: Dispatch<SetStateAction<boolean>>
  ) => void;
  onChange?: (check: boolean) => void;
}

type Props = Omit<ICheckBox, 'id'>;

export default function IdentifierCheckBox({
  title,
  sub,
  defaultValue,
  disable,
  noPad = true,
  noMargin,
  onCheck,
  onUnCheck,
  onChange,
}: Props) {
  const [check, setCheck] = useState(false);

  const onClickCheckBox: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disable) return;

    if (typeof onChange === 'function') {
      onChange(!check);
    }

    if (!check && typeof onCheck === 'function') {
      onCheck(!check, setCheck);
    } else if (check && typeof onUnCheck === 'function') {
      onUnCheck(!check, setCheck);
    } else {
      setCheck((prev) => !prev);
    }
  };

  useLayoutEffect(() => {
    if (typeof defaultValue !== 'undefined') {
      setCheck(defaultValue);
    }
  }, [defaultValue]);

  return (
    <label
      className={cx(
        styles.label,
        !noMargin && styles.margin,
        !noPad && styles.padding,
        disable && styles.disable
      )}
    >
      <div className={styles.inform}>
        <Text>{title}</Text>
        <Text className={utils.pt_4} size="xs" theme="gray">
          {sub}
        </Text>
      </div>
      <div className={styles.checkBox}>
        <div className={styles.box} onClick={onClickCheckBox}>
          <div className={styles.inner}>
            <div
              className={cx(
                styles.border,
                check && styles.active,
                disable && styles.disable
              )}
            >
              {check && <CheckSvg width={20} white />}
            </div>
          </div>
          <input hidden />
        </div>
      </div>
    </label>
  );
}
