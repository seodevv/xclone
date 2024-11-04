'use client';

import DivideLine from '@/app/_component/_util/DivideLine';
import styles from './monetizationPopup.module.css';
import Text from '@/app/_component/_text/Text';
import EmptyCircleSvg from '@/app/_svg/_settings/EmptyCircleSvg';
import FullCircleSvg from '@/app/_svg/_settings/FullCircleSvg';
import {
  Fragment,
  MouseEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

interface Props {
  position: { x: number; y: number };
  options: { text: string; check: boolean }[];
  onClose?: () => void;
}

export default function MonetizationPopup({
  position,
  options,
  onClose,
}: Props) {
  const [clientWidth, setClientWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const record = useRef(false);
  const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      record.current = true;
    } else {
      record.current = false;
    }
  };
  const onMouseUp: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (!record.current) return;

    if (typeof onClose === 'function') {
      onClose();
    }

    record.current = false;
  };

  useLayoutEffect(() => {
    if (containerRef.current) {
      setClientWidth(containerRef.current.clientWidth);
    }
  }, [setClientWidth]);

  useEffect(() => {
    const listener = () => {
      if (typeof onClose === 'function') {
        onClose();
      }
    };
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, [onClose]);

  return (
    <div
      className={styles.background}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <div className={styles.relative}>
        <div
          className={styles.container}
          style={{ top: position.y, left: position.x - clientWidth / 2 }}
          ref={containerRef}
        >
          {options.map((v, i) => (
            <Fragment key={i}>
              {i !== 0 && <DivideLine />}
              <div className={styles.item}>
                <Text className={styles.text} bold="bold">
                  {v.text}
                </Text>
                {v.check ? (
                  <FullCircleSvg className={styles.full} inherit />
                ) : (
                  <EmptyCircleSvg className={styles.empty} inherit />
                )}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
