import stylse from './selector.module.css';
import { captialCase } from '@/app/_lib/common';
import {
  ChangeEventHandler,
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Text from '@/app/_component/_text/Text';
import DownArrowSvg from '@/app/_svg/arrow/DownArrowSvg';

interface Props {
  data?: { id: string; value: string | number }[];
  placeholder: string;
  defaultValue?: string | number;
  hasDefault?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

interface IdentifierRef {
  focus: () => void;
  blur: () => void;
}

const IdentifierSelector = forwardRef<IdentifierRef, Props>(
  (
    { data = [], placeholder, defaultValue, hasDefault, disabled, onChange },
    ref
  ) => {
    const [select, setSelect] = useState('');
    const selectRef = useRef<HTMLSelectElement>(null);

    const onChangeSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
      // setSelect(e.target.value);
      if (typeof onChange === 'function') {
        onChange(e.target.value);
      }
    };

    useImperativeHandle(ref, () => {
      return {
        focus: () => {
          selectRef.current?.focus();
        },
        blur: () => {
          selectRef.current?.blur();
        },
      };
    });

    useLayoutEffect(() => {
      if (typeof defaultValue !== 'undefined') {
        setSelect(defaultValue.toString());
      }
    }, [defaultValue]);

    return (
      <div className={stylse.selector}>
        <label className={stylse.label}>
          <Text text={captialCase(placeholder)} size="xs" theme="gray" />
        </label>
        <select
          ref={selectRef}
          className={stylse.select}
          value={select}
          onChange={onChangeSelect}
          // defaultValue={defaultValue}
          disabled={disabled}
        >
          {hasDefault && <option className={stylse.option} value=""></option>}
          {data.map((v) => (
            <option key={v.id} className={stylse.option} value={v.value}>
              {v.id}
            </option>
          ))}
        </select>
        <DownArrowSvg className={stylse.arrow} width={22.5} />
        {disabled && <div className={stylse.disabled}></div>}
      </div>
    );
  }
);

IdentifierSelector.displayName = 'IdentifierSelector';
export default IdentifierSelector;
