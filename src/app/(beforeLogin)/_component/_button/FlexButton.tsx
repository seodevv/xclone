import styles from './beforeLogin.button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import cx from 'classnames';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import { useFormStatus } from 'react-dom';

interface Props {
  className?: string;
  style?: CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  theme?: 'theme' | 'reverse' | 'white' | 'red' | 'primary';
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  disabled?: boolean;
  large?: boolean;
  medium?: boolean;
}

export default function FlexButton({
  className,
  style,
  type = 'button',
  theme = 'theme',
  text,
  onClick,
  isLoading = false,
  disabled = false,
  large,
  medium,
}: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      className={cx(
        styles.btn,
        styles[theme],
        large && styles.large,
        medium && styles.medium,
        className
      )}
      style={style}
      type={type}
      onClick={onClick}
      disabled={disabled || (type === 'submit' && pending)}
    >
      <div className={cx(styles.btnText, large && styles.large)}>
        {isLoading || (type === 'submit' && pending) ? (
          <LoadingSpinner
            style={{ padding: 0 }}
            fill={theme === 'theme' ? 'reverse' : 'theme'}
          />
        ) : (
          <span>{text}</span>
        )}
      </div>
    </button>
  );
}
