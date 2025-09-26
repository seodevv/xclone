'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import {
  createContext,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

type Info = {
  scroll: 'bottom' | 'idle' | 'top';
  position: 'bottom' | 'middle' | 'top';
  y: number;
};

type Context = {
  info: Info;
  scrollRef: RefObject<HTMLDivElement> | null;
  setScroll: (scroll: Info['scroll']) => void;
};

const initialState: Context = {
  info: {
    scroll: 'bottom',
    position: 'bottom',
    y: -1,
  },
  scrollRef: null,
  setScroll: () => {},
};

export const MessagesScrollContext = createContext<Context>(initialState);

interface Props {
  children: React.ReactNode;
}

export default function MessagesScrollProvider({ children }: Props) {
  const segment = useSelectedLayoutSegment();
  const [info, setInfo] = useState<Info>(initialState.info);
  const scrollRef = useRef<HTMLDivElement>(null);

  const setScroll = useCallback(
    (scroll: Info['scroll']) => {
      setInfo((prev) => ({ ...prev, scroll }));
    },
    [setInfo]
  );
  const setPosition = useCallback(
    (position: Info['position']) => {
      setInfo((prev) => ({
        ...prev,
        position,
      }));
    },
    [setInfo]
  );
  const setY = useCallback(
    (y: Info['y']) => {
      setInfo((prev) => ({ ...prev, y }));
    },
    [setInfo]
  );

  const goBottom = useCallback(() => {
    if (!scrollRef.current) return;

    const { clientHeight, scrollHeight } = scrollRef.current;
    scrollRef.current.scrollTop = scrollHeight;

    setY(scrollRef.current.scrollTop);

    if (clientHeight === scrollHeight) {
      setPosition('bottom');
    }
  }, [setY, setPosition]);

  useLayoutEffect(() => {
    setInfo(initialState.info);
  }, [segment, setInfo]);

  useLayoutEffect(() => {
    if (info.scroll === 'bottom') {
      goBottom();
      setScroll('idle');
    }
  }, [info.scroll, goBottom, setScroll]);

  useEffect(() => {
    const listener: EventListener = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        setPosition(
          scrollTop + clientHeight > scrollHeight - 100 ? 'bottom' : 'middle'
        );
        setY(scrollTop);
      }
    };
    scrollRef.current?.addEventListener('scroll', listener);
    return () => {
      scrollRef.current?.removeEventListener('scroll', listener);
    };
  }, [setPosition, setY]);

  return (
    <MessagesScrollContext.Provider value={{ info, scrollRef, setScroll }}>
      {children}
    </MessagesScrollContext.Provider>
  );
}
