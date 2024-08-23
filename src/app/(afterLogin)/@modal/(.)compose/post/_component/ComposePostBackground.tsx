'use client';

import styles from './compose.post.background.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import useComposeStore from '@/app/(afterLogin)/_store/ComposeStore';
import { PathRecordContext } from '@/app/_provider/PathRecordProvider';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useContext } from 'react';

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

  const onClickBackground: MouseEventHandler<HTMLElement> = (e) => {
    if (e.target === e.currentTarget) {
      reset();
      if (prevPath) {
        if (ctx.prevPath === ctx.path) {
          router.push(prevPath);
          return;
        }
      }
      router.back();
    }
  };

  return (
    <main
      className={cx(styles.background, utils.fadeIn)}
      onClick={onClickBackground}
    >
      {children}
    </main>
  );
}
