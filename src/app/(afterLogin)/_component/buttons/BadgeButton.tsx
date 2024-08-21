'use client';

import styles from './button.module.css';
import {
  CSSProperties,
  MouseEventHandler,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import BadgeSvg from '@/app/_svg/verified/BadgeSvg';
import Link from 'next/link';
import CalendarSvg from '@/app/_svg/profile/CalendarSvg';
import { User } from '@/model/User';
import { MONTH_EN } from '@/app/_lib/common';
import useViewport from '../../_hooks/useViewport';

interface Props {
  style?: CSSProperties;
  badge?: User['verified'];
  width?: number;
  unClickable?: boolean;
}

interface Active {
  flag: boolean;
  position: {
    x: 'left' | 'right';
    y: 'top' | 'bottom';
  };
  x: number;
  y: number;
}

export default function BadgeButton({
  style,
  badge,
  width = 20,
  unClickable,
}: Props) {
  const { width: viewWidth, height: viewHeight } = useViewport();
  const [active, setActive] = useState<Active>({
    flag: false,
    position: { x: 'left', y: 'top' },
    x: 0,
    y: 0,
  });
  const [fadeOut, setFadeOut] = useState(false);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onClickBadge: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (unClickable) return;
    e.preventDefault();
    e.stopPropagation();
    setFadeOut(false);
    setActive((prev) => ({ ...prev, flag: true, x: e.clientX, y: e.clientY }));
  };

  const onClickOutSide: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      setFadeOut(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setActive((prev) => ({ ...prev, flag: false }));
      }, 300);
    }
  };

  useLayoutEffect(() => {
    if (active.flag && infoRef.current) {
      const { offsetWidth, offsetHeight } = infoRef.current;
      setActive((prev) => {
        let nextPosition = { ...prev.position };
        let nextX = prev.x - offsetWidth / 2;
        let nextX_r = prev.x + offsetWidth / 2 - viewWidth;
        let nextY = prev.y + offsetHeight - viewHeight;

        if (nextX < 0) {
          nextPosition.x = 'left';
          nextX = 15;
        } else if (nextX_r > 0) {
          nextPosition.x = 'right';
          nextX = 15;
        } else {
          nextPosition.x = 'left';
        }

        if (nextY > 0 && prev.y > offsetHeight) {
          nextY = prev.y - offsetHeight - 20;
        } else {
          nextY = prev.y + 20;
        }
        return { ...prev, position: nextPosition, x: nextX, y: nextY };
      });
    }
  }, [active.flag, setActive, viewWidth, viewHeight]);

  if (!badge) return null;

  let message;
  switch (badge.type) {
    case 'blue':
      message = 'This account is verified.';
      break;
    case 'gold':
      message =
        "This account is verified because it's an official organization on X.";
      break;
    case 'gray':
      message =
        'This account is verified because it is a government or multilateral organization account.';
      break;
  }

  return (
    <div className={styles.badgeContainer} style={style}>
      <button
        className={styles.badgeBtn}
        style={{ width: width, height: width }}
        type="button"
        onClick={onClickBadge}
      >
        <BadgeSvg type={badge.type} width={width} />
      </button>
      {active.flag && (
        <div
          className={cx(
            styles.outSide,
            styles.fadeIn,
            fadeOut && styles.fadeOut
          )}
          onClick={onClickOutSide}
        >
          <div
            ref={infoRef}
            className={styles.badgeInfo}
            style={{
              top: active.position.y === 'top' ? active.y : undefined,
              right: active.position.x === 'right' ? active.x : undefined,
              bottom: active.position.y === 'bottom' ? active.y : undefined,
              left: active.position.x === 'left' ? active.x : undefined,
            }}
          >
            <div className={styles.badgeTitle}>
              <span>Verified account</span>
            </div>
            <div className={styles.badgeType}>
              <BadgeSvg
                type={badge.type}
                width={22}
                style={{ margin: 0, minWidth: 22 }}
              />
              <span>
                {message}
                <Link
                  className={styles.learnMore}
                  href={
                    'https://help.x.com/managing-your-account/about-x-verified-accounts'
                  }
                  target="_blank"
                >
                  Learn more
                </Link>
              </span>
            </div>
            <div className={styles.badgeDate}>
              <CalendarSvg width={22} white />
              <span>
                {`Verified since ${
                  MONTH_EN[new Date(badge.date).getMonth()]
                } ${new Date(badge.date).getFullYear()}.`}
              </span>
            </div>
            <Link href={'#'} className={styles.getPremium}>
              <span>Upgrade to get verified</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
