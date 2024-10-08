import styles from './input.module.css';
import {
  ChangeEventHandler,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import { useFormStatus } from 'react-dom';
import PasswordButton from '@/app/(beforeLogin)/_component/_button/PasswordButton';

interface Props {
  type?: 'text' | 'password';
  name?: string;
  placeholder: string;
  defaultValue?: string;
  validate?: {
    minLength?: number;
    maxLength?: number;
    regex?: RegExp;
    required?: boolean;
    allowEmpty?: boolean;
    allowBlank?: boolean;
    message?: string;
  };
  disabled?: boolean;
  readOnly?: boolean;
  passwordHide?: boolean;
  noTab?: boolean;
  onChange?: (value: string) => void;
  onEnter?: () => void;
  onSuccess?: (value: string) => void;
  onError?: () => void;
}

export interface IdentifierInputRef {
  focus: () => void;
  blur: () => void;
}

const IdentifierInput = forwardRef<IdentifierInputRef, Props>(
  (
    {
      type = 'text',
      name,
      placeholder,
      defaultValue,
      validate,
      disabled = false,
      readOnly = false,
      passwordHide,
      noTab,
      onChange,
      onEnter,
      onSuccess,
      onError,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    const [state, setState] = useState<string>(defaultValue || '');
    const [focus, setFocus] = useState(false);
    const [highlight, setHighlight] = useState<boolean>(
      !!(disabled || defaultValue)
    );
    const [passwordShow, setpasswordShow] = useState<boolean>(false);
    const [error, setError] = useState<{ flag: boolean; message: string }>({
      flag: false,
      message: '',
    });
    const inputRef = useRef<HTMLInputElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const validateInput = (str: string) => {
      let result = false;
      if (!validate) {
        if (!str || !str.trim()) {
          return result;
        }
        return !result;
      }

      const { minLength, maxLength, regex, allowEmpty, allowBlank, required } =
        validate;
      const blank = /\s/;
      if (type !== 'password' && str.startsWith(' ')) {
        errorHandler('Input cannot begin with a space.');
      } else if (!allowEmpty && str === '') {
        errorHandler('Input cannot contain empty spaces.');
      } else if (!allowBlank && blank.test(str)) {
        errorHandler('Input cannot contain blank spaces.');
      } else if (minLength && str.length < minLength) {
        errorHandler(`Make sure it’s ${minLength} characters or more.`);
      } else if (maxLength && str.length > maxLength) {
        errorHandler(`Make sure it’s ${maxLength} characters or less.`);
      } else if (regex && !regex.test(str) && str !== '') {
        errorHandler(validate.message || 'This is not a valid input.');
      } else if (required && !str) {
        errorHandler(validate.message || 'Please enter your input.');
      } else {
        setError({ flag: false, message: '' });
        result = true;
      }
      return result;
    };

    const errorHandler = (message: string) => {
      timerRef.current = setTimeout(() => {
        setError({ flag: true, message });
      }, 200);
    };

    const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
      if (validate?.maxLength && e.target.value.length > validate.maxLength) {
        return;
      }

      if (timerRef.current) clearTimeout(timerRef.current);

      setState(e.target.value);

      if (typeof onChange === 'function') {
        onChange(e.target.value);
      }

      if (e.target.value) {
        setHighlight(true);
      } else {
        setHighlight(false);
      }

      if (validateInput(e.target.value)) {
        if (typeof onSuccess === 'function') {
          onSuccess(e.target.value);
        }
      } else {
        if (typeof onError === 'function') {
          onError();
        }
      }
    };

    const onKeyDownInput: KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.key === 'Enter') {
        if (typeof onEnter === 'function') {
          onEnter();
          inputRef.current?.blur();
        }
      }
    };

    const onClickPasswordEye: MouseEventHandler<HTMLButtonElement> = () => {
      if (passwordHide) return;
      setpasswordShow((prev) => !prev);
      inputRef.current?.focus();
      setTimeout(() => inputRef.current?.setSelectionRange(100, 100));
    };

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      blur: () => {
        inputRef.current?.blur();
      },
    }));

    return (
      <div className={styles.identifier}>
        <label className={cx(styles.label, error.flag && styles.error)}>
          <div className={styles.labelColumnFlex}>
            <div className={styles.placeholder}>
              <div
                className={cx(
                  styles.placeholderText,
                  highlight && styles.highlight
                )}
              >
                <span>{placeholder}</span>
              </div>
            </div>
            {focus && validate && validate.maxLength && (
              <div className={styles.maxLength}>
                <span>{`${state.length} / ${validate.maxLength}`}</span>
              </div>
            )}
            <div className={styles.inputFlex}>
              <div className={styles.inputBox}>
                <input
                  ref={inputRef}
                  name={name}
                  className={styles.input}
                  type={passwordShow ? 'text' : type}
                  value={state}
                  onChange={onChangeInput}
                  onKeyDown={onKeyDownInput}
                  disabled={disabled}
                  readOnly={readOnly || pending}
                  spellCheck={false}
                  autoComplete="off"
                  tabIndex={noTab ? -1 : undefined}
                  onFocus={() => {
                    setFocus(true);
                  }}
                  onBlur={(e) => {
                    setFocus(false);
                    if (!e.target.value) {
                      setHighlight(false);
                    }
                  }}
                />
                {type === 'password' && !passwordHide && (
                  <PasswordButton
                    white
                    onClick={onClickPasswordEye}
                    active={!passwordShow}
                  />
                )}
              </div>
            </div>
          </div>
          {(disabled || readOnly || pending) && (
            <div className={styles.disabled}></div>
          )}
        </label>
        {error.flag && (
          <div className={cx(styles.errorMessage, styles.fadeIn)}>
            {error.message}
          </div>
        )}
      </div>
    );
  }
);

IdentifierInput.displayName = 'IdentifierInput';

export default IdentifierInput;
