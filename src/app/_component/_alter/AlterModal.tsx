'use client';

import styles from './alterModal.module.css';
import { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { Modal } from '@/app/_provider/AlterModalProvider';

export default function AlterModal() {
  const { getMessage, getDuration, getType, resetMessage } = useAlterModal();
  const [fadeOut, setFadeOut] = useState(false);
  const firstMount = useRef(true);
  const background: { [key in Modal['type']]: string } = {
    notice: '#1D9BF0',
    warning: '#FFD400',
    error: '#F4212F',
  };

  const color: { [key in Modal['type']]: string } = {
    notice: '#fff',
    warning: '#000',
    error: '#fff',
  };

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      return;
    }

    let a, b: ReturnType<typeof setTimeout>;
    a = setTimeout(() => {
      setFadeOut(true);
    }, getDuration());
    b = setTimeout(() => {
      resetMessage();
    }, getDuration() + 300);

    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  return (
    <div className={cx(styles.modalGround, fadeOut && styles.fadeOut)}>
      <div
        className={styles.modalContent}
        style={{
          backgroundColor: background[getType()],
          color: color[getType()],
          fontWeight: 'bold',
        }}
      >
        {getMessage()
          .split(/\r|\r\n|\n/)
          .map((message, i) => (
            <span key={i}>{message}</span>
          ))}
      </div>
    </div>
  );
}
