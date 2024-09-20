import styles from './input.module.css';
import {
  ChangeEventHandler,
  forwardRef,
  KeyboardEventHandler,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import { useFormStatus } from 'react-dom';
import ReactTextareaAutosize from 'react-textarea-autosize';

interface Props {
  name?: string;
  placeholder: string;
  defaultValue?: string;
  validate?: {
    minLength?: number;
    maxLength?: number;
    regex?: RegExp;
    required?: boolean;
    message?: string;
  };
  minRow?: number;
  maxRow?: number;
  disabled?: boolean;
  readOnly?: boolean;
  noTab?: boolean;
  onEnter?: () => void;
  onSuccess?: (value: string) => void;
  onError?: () => void;
}

export interface IdentifiertextareaRef {
  focus: () => void;
  blur: () => void;
}

const IdentifierTextarea = forwardRef<IdentifiertextareaRef, Props>(
  (
    {
      name,
      placeholder,
      defaultValue,
      validate,
      minRow,
      maxRow,
      disabled = false,
      readOnly = false,
      noTab,
      onEnter,
      onSuccess,
      onError,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    const [state, setState] = useState<string>(defaultValue || '');
    const [highlight, setHighlight] = useState<boolean>(
      !!(disabled || defaultValue)
    );
    const [focus, setFocus] = useState(false);
    const [error, setError] = useState<{ flag: boolean; message: string }>({
      flag: false,
      message: '',
    });
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const validateInput = (str: string) => {
      let result = false;
      if (!validate) {
        if (!str || !str.trim()) {
          return result;
        }
        return !result;
      }

      const { minLength, maxLength, regex, required } = validate;
      if (minLength && str.length < minLength) {
        errorHandler(`Make sure it’s ${minLength} characters or more.`);
      } else if (maxLength && str.length > maxLength) {
        errorHandler(`Make sure it’s ${maxLength} characters or less.`);
      } else if (regex && !regex.test(str)) {
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

    const onChangeInput: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      if (validate?.maxLength && e.target.value.length > validate.maxLength) {
        return;
      }

      if (timerRef.current) clearTimeout(timerRef.current);

      setState(e.target.value);

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

    const onKeyDownInput: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
      if (e.key === 'Enter') {
        if (typeof onEnter === 'function') {
          onEnter();
          textareaRef.current?.blur();
        }
      }
    };

    useImperativeHandle(ref, () => ({
      focus: () => {
        textareaRef.current?.focus();
      },
      blur: () => {
        textareaRef.current?.blur();
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
                <ReactTextareaAutosize
                  ref={textareaRef}
                  name={name}
                  className={styles.input}
                  value={state}
                  onChange={onChangeInput}
                  onKeyDown={onKeyDownInput}
                  disabled={disabled}
                  readOnly={readOnly || pending}
                  spellCheck={false}
                  autoComplete="off"
                  tabIndex={noTab ? -1 : undefined}
                  minRows={minRow}
                  maxRows={maxRow}
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

IdentifierTextarea.displayName = 'IdentifierInput';

export default IdentifierTextarea;
