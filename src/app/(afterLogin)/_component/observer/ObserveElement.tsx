import styles from './observerElement.module.css';
import { CSSProperties, useEffect, useRef } from 'react';
import cx from 'classnames';

interface Props {
  className?: string;
  style?: CSSProperties;
  callback: () => void;
  dependencies?: any[];
  isFetching?: boolean;
  active: boolean;
}

export default function ObserveElement({
  className,
  style,
  callback,
  dependencies = [],
  isFetching,
  active,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log('show');
        callback();
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, dependencies);

  return (
    <>
      {active && (
        <div
          className={cx(
            styles.observer,
            isFetching && styles.fetching,
            className
          )}
          style={style}
          ref={ref}
        ></div>
      )}
    </>
  );
}
