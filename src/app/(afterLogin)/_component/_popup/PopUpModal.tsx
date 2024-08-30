'use client';

import styles from './popUpModal.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import usePopUpStore from '@/app/(afterLogin)/_store/PopUpStore';

import { MouseEventHandler, useLayoutEffect, useRef, useState } from 'react';

export default function PopUpModal() {
  const store = usePopUpStore();
  const [fadeOut, setFadeOut] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onClickOutside: MouseEventHandler<HTMLDivElement> = (e) => {
    if (timer.current) return;
    if (e.target === e.currentTarget) {
      setFadeOut(true);
      timer.current = setTimeout(() => {
        store.reset();
        setFadeOut(false);
        timer.current = null;
      }, 200);
    }
  };

  useLayoutEffect(() => {
    const resizeListener = () => {
      const target = store.position.element;
      if (!target) return;
      const { x, y } = target.getBoundingClientRect();
      store.setPopup({ position: { x, y } });
    };
    if (store.type === 'pop') {
      window.addEventListener('resize', resizeListener);
    }
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [store.type, store.position.element, store.setPopup]);

  if (store.type === 'idle') return null;

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
            top: store.position.y + store.position.height,
            left: store.position.x,
          }}
        >
          <div className={styles.title}>
            <span>{store.content.title}</span>
          </div>
          <div className={styles.description}>
            <span>{store.content.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
