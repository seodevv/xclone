import { capitalCase } from '@/app/_lib/common';
import styles from './i.toggle.module.css';
import cx from 'classnames';
import { MouseEventHandler } from 'react';

interface Props {
  text: string;
  active?: boolean;
  best?: boolean;
  onClick?: () => void;
}

export default function IToggleSelector({
  text,
  active,
  best,
  onClick,
}: Props) {
  const onClickAction: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof onClick === 'function') {
      onClick();
    }
  };
  return (
    <button
      className={cx(styles.toggle, active && styles.checked)}
      onClick={onClickAction}
    >
      <div className={styles.option}>
        <label className={cx(styles.label, active && styles.bold)}>
          <span>{capitalCase(text)}</span>
        </label>
        {best && (
          <div className={styles.best}>
            <span>Best Value</span>
          </div>
        )}
      </div>
    </button>
  );
}
