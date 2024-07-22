'use client';

import styles from './alterModal.module.css';
import { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import useAlterModal from '../../_hooks/useAlterModal';

export default function AlterModal() {
  const { getMessage, getDuration, resetMessage } = useAlterModal();
  const [fadeOut, setFadeOut] = useState(false);
  const firstMount = useRef(true);

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
      <div className={styles.modalContent}>
        {getMessage()
          .split(/\r|\r\n|\n/)
          .map((message, i) => (
            <span key={i}>{message}</span>
          ))}
      </div>
    </div>
  );
}
