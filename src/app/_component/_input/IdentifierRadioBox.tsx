import styles from './checkbox.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import Text from '@/app/_component/_text/Text';
import CheckSvg from '@/app/_svg/input/CheckSvg';
import { useLayoutEffect, useState } from 'react';

export interface IRadioBox {
  id: string;
  title: string;
}

interface Props {
  data: IRadioBox[];
  name: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  noPad?: boolean;
}

export default function IdentifierRadioBox({
  data,
  name,
  defaultValue,
  onChange,
  noPad = false,
}: Props) {
  const [check, setCheck] = useState('');

  const onChangeInput = (value: string) => {
    setCheck(value);
    if (typeof onChange !== 'undefined') {
      onChange(value);
    }
  };

  useLayoutEffect(() => {
    if (typeof defaultValue !== 'undefined') {
      setCheck(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className={cx(!noPad && utils.p_basic)}>
      {data.map((v) => (
        <label
          key={v.id}
          className={cx(styles.label, styles.radioLabel)}
          htmlFor={v.id}
        >
          <div className={styles.inform}>
            <Text>{v.title}</Text>
          </div>
          <div className={styles.radioBox}>
            <div className={styles.box}>
              <div className={styles.inner}>
                <div
                  className={cx(
                    styles.border,
                    styles.circle,
                    check === v.id && styles.active
                  )}
                >
                  {check === v.id && <CheckSvg width={20} white />}
                </div>
              </div>
              <input
                type="radio"
                id={v.id}
                name={name}
                value={v.id}
                onChange={() => onChangeInput(v.id)}
                hidden
              />
            </div>
          </div>
        </label>
      ))}
    </div>
  );
}
