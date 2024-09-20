'use client';

import styles from './compose.post.background.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import useComposeStore from '@/app/(afterLogin)/_store/ComposeStore';
import { PathRecordContext } from '@/app/_provider/PathRecordProvider';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useContext, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  prevPath?: string;
}

export default function ComposePostBackground({
  children,
  prevPath = '/home',
}: Props) {
  const router = useRouter();
  const ctx = useContext(PathRecordContext);
  const reset = useComposeStore((state) => state.reset);
  const record = useRef(false);

  const onMouseDown: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      record.current = true;
    } else {
      record.current = false;
    }
  };

  const onMouseUp: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    if (e.target !== e.currentTarget) return;
    if (!record.current) return;

    reset();
    if (prevPath) {
      if (ctx.prevPath === ctx.path) {
        router.push(prevPath);
        return;
      }
    }
    router.back();
  };

  return (
    <main
      className={cx(styles.background, utils.fadeIn)}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {children}
    </main>
  );
}
