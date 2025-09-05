'use client';

import styles from './i.background.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import HtmlOverflowHidden from '@/app/_component/_overflow/HtmlOverflowHidden';
import { CSSProperties, MouseEventHandler, useContext, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useHistoryStore from '@/app/(afterLogin)/_store/HistoryStore';
import { PathRecordContext } from '@/app/_provider/PathRecordProvider';
import XMarkSvg from '@/app/_svg/tweet/XMarkSvg';

interface Props {
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  color?: 'default' | 'none';
  size?: 'small' | 'medium' | 'large' | 'none';
  height?: 'auto';
  maxHeight?: '90dvh';
  overflow?: 'auto';
  prevPath?: string;
  onClick?: () => void;
  noHidden?: boolean;
  xmark?: boolean;
}

export default function IBackground({
  className,
  style,
  children,
  color = 'default',
  size = 'medium',
  height,
  maxHeight,
  overflow,
  prevPath = '/home',
  onClick,
  noHidden,
  xmark,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const ctx = useContext(PathRecordContext);
  const record = useRef({ flag: false, timestamp: 0 });
  const { stack, resetStack } = useHistoryStore((state) => ({
    stack: state.stack,
    resetStack: state.resetStack,
  }));

  const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      record.current = { flag: true, timestamp: Date.now() };
    } else {
      record.current = { ...record.current, flag: false };
    }
  };

  const onMouseUp: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (e.target !== e.currentTarget) return;
    if (!record.current.flag) return;
    // if (Date.now() - record.current.timestamp > 500) return;

    routerBack();
  };

  const onClickXmark = () => {
    routerBack();
  };

  const routerBack = () => {
    if (typeof onClick === 'function') {
      return onClick();
    }

    if (prevPath && ctx.prevPath === ctx.path) {
      router.push(prevPath);
      return;
    }

    if (stack < 0) {
      resetStack();
      window.history.go(stack);
      return;
    }

    router.back();
  };

  return (
    <main
      className={cx(
        styles.background,
        color === 'default' && styles.bg_default,
        !from && utils.fadeIn,
        className
      )}
      style={style}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {xmark && (
        <div
          className={cx(
            utils.pa_12,
            utils.absolute,
            utils.t_l_0,
            utils.zIndex_xxxl,
            utils.cursor_point
          )}
        >
          <button
            className={cx(
              utils.w_min_36,
              utils.h_min_36,
              utils.bg_gray_a_75,
              utils.hover_bg_gray_a_75,
              utils.active_bg_gray_a_75,
              utils.backdrop_blur_s,
              utils.bd_none,
              utils.br_9999,
              utils.transit_basic,
              utils.cursor_point
            )}
            onClick={onClickXmark}
          >
            <XMarkSvg width={20} />
          </button>
        </div>
      )}
      <HtmlOverflowHidden noHidden={noHidden} />
      <div
        className={cx(
          utils.d_flexColumn,
          size !== 'none' && styles.modal,
          styles[size],
          styles[`height-${height}`],
          styles[`maxHeight_${maxHeight}`],
          overflow === 'auto' && styles.auto
        )}
      >
        {children}
      </div>
    </main>
  );
}
