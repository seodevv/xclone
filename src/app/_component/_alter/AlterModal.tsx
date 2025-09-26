'use client';

import styles from './alterModal.module.css';
import { useEffect, useState } from 'react';
import cx from 'classnames';
import useAlterStore, {
  AlterState,
} from '@/app/(afterLogin)/_store/AlterStore';

export default function AlterModal() {
  const { show, type, message, duration, resetModal } = useAlterStore();
  const [fadeOut, setFadeOut] = useState(false);
  const background: { [key in AlterState['type']]: string } = {
    notice: '#1D9BF0',
    warning: '#FFD400',
    error: '#F4212F',
  };

  const color: { [key in AlterState['type']]: string } = {
    notice: '#fff',
    warning: '#000',
    error: '#fff',
  };

  useEffect(() => {
    let a: ReturnType<typeof setTimeout>;
    let b: ReturnType<typeof setTimeout>;

    if (show) {
      a = setTimeout(() => {
        setFadeOut(true);
      }, duration);
      b = setTimeout(() => {
        resetModal();
      }, duration + 300);
    }
    return () => {
      clearTimeout(a);
      clearTimeout(b);
      setFadeOut(false);
    };
  }, [show, setFadeOut, resetModal, setFadeOut]);

  if (!show) return null;

  return (
    <div className={cx(styles.modalGround, fadeOut && styles.fadeOut)}>
      <div
        className={styles.modalContent}
        style={{
          backgroundColor: background[type],
          color: color[type],
          fontWeight: 'bold',
        }}
      >
        {message.split(/\r|\r\n|\n/).map((message, i) => (
          <span key={i}>{message}</span>
        ))}
      </div>
    </div>
  );
}
