import styles from './checkbox.module.css';
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
  defaultVlaue?: boolean;
  onCheck?: (
    check: boolean,
    setCheck: Dispatch<SetStateAction<boolean>>
  ) => void;
  onUnCheck?: (
    check: boolean,
    setCheck: Dispatch<SetStateAction<boolean>>
  ) => void;
}

interface Props {
  title: string | JSX.Element;
  sub?: string | JSX.Element;
  defaultValue?: boolean;
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

export default function IdentifierCheckBox({
  title,
  sub,
  defaultValue,
  onCheck,
  onUnCheck,
  onChange,
}: Props) {
  const [check, setCheck] = useState(false);

  const onClickCheckBox: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
    <label className={styles.label}>
      <div className={styles.inform}>
        <Text>{title}</Text>
        <Text size="xs" theme="gray">
          {sub}
        </Text>
      </div>
      <div className={styles.checkBox}>
        <div className={styles.box} onClick={onClickCheckBox}>
          <div className={styles.inner}>
            <div className={cx(styles.border, check && styles.active)}>
              {check && <CheckSvg width={20} white />}
            </div>
          </div>
          <input hidden />
        </div>
      </div>
    </label>
  );
}
