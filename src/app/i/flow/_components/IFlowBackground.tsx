'use client';

import styles from '../_style/i.flow.page.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import { PathRecordContext } from '@/app/_provider/PathRecordProvider';
import { MouseEventHandler, useContext, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  from?: string;
}

export default function IFlowBackground({ children, from }: Props) {
  const record = useRef<boolean>(false);
  const { routerBack } = useContext(PathRecordContext);

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
    if (e.target !== e.currentTarget) return;
    if (!record.current) return;

    routerBack();
  };

  return (
    <main
      className={cx(styles.background, !from && utils.fadeIn)}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {children}
    </main>
  );
}
