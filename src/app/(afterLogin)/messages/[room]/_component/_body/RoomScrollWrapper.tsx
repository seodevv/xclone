'use client';

import styles from './room.body.module.css';
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { MessagesScrollContext } from '@/app/(afterLogin)/messages/[room]/_provider/MessagesScrollProvider';

interface Props {
  children: React.ReactNode;
}

export default function RoomScrollWrapper({ children }: Props) {
  const { info, setScroll, setPosition } = useContext(MessagesScrollContext);
  const scrollRef = useRef<HTMLDivElement>(null);

  const goBottom = useCallback(() => {
    if (!scrollRef.current) return;

    const { clientHeight, scrollHeight } = scrollRef.current;
    scrollRef.current.scrollTop = scrollHeight;

    if (clientHeight === scrollHeight) {
      setPosition('bottom');
    }
  }, [setPosition]);

  useEffect(() => {
    const listener: EventListener = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        setPosition(
          scrollTop + clientHeight > scrollHeight - 100 ? 'bottom' : 'middle'
        );
      }
    };
    scrollRef.current?.addEventListener('scroll', listener);
    return () => {
      scrollRef.current?.removeEventListener('scroll', listener);
    };
  }, [setPosition]);

  useLayoutEffect(() => {
    if (info.scroll === 'bottom') {
      goBottom();
      setScroll('idle');
    }
  }, [info.scroll, goBottom]);

  return (
    <div ref={scrollRef} className={styles.content}>
      {children}
    </div>
  );
}
