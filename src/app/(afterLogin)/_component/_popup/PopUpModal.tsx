'use client';

import styles from './popUpModal.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import usePopUpStore from '@/app/(afterLogin)/_store/PopUpStore';

import { MouseEventHandler, useLayoutEffect, useRef, useState } from 'react';

export default function PopUpModal() {
  const {
    type,
    content: { title, description },
    position: { x, y, width, height, element },
    setPopup,
    reset,
  } = usePopUpStore();
  const [fadeOut, setFadeOut] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onClickOutside: MouseEventHandler<HTMLDivElement> = (e) => {
    if (timer.current) return;
    if (e.target === e.currentTarget) {
      setFadeOut(true);
      timer.current = setTimeout(() => {
        reset();
        setFadeOut(false);
        timer.current = null;
      }, 200);
    }
  };

  useLayoutEffect(() => {
    const resizeListener = () => {
      const target = element;
      if (!target) return;
      const { x, y } = target.getBoundingClientRect();
      setPopup({ position: { x, y } });
    };
    if (type === 'pop') {
      window.addEventListener('resize', resizeListener);
    }
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [type, element, setPopup]);

  if (type === 'idle') return null;

  return (
    <div className={styles.absolute}>
      <div className={styles.relative}>
        <div className={styles.fixed} onClick={onClickOutside}></div>
        <div
          className={cx(
            styles.popup,
            utils.fadeIn,
            fadeOut && [styles.out, utils.fadeOut]
          )}
          style={{
            top: y + height,
            left: x,
          }}
        >
          <div className={styles.title}>
            <span>{title}</span>
          </div>
          <div className={styles.description}>
            <span>{description}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
