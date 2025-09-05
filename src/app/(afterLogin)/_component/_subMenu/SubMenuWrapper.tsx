'use client';

import styles from './subMenu.wrapper.module.css';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import {
  CSSProperties,
  MouseEventHandler,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import useViewport from '@/app/(afterLogin)/_hooks/useViewport';

interface Props {
  className?: string;
  style?: CSSProperties;
  direction?: 'row' | 'column';
  position?:
    | 'left'
    | 'center'
    | 'right'
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  nav?: boolean;
  children?: React.ReactNode;
}

export default function SubMenuWrapper({
  className,
  style,
  direction = 'column',
  position = 'center',
  nav,
  children,
}: Props) {
  const { width: viewWidth, height: viewHeight } = useViewport();
  const {
    menu: {
      position: { x, y, width, height, target },
    },
    dispatchMenu,
    close,
  } = useContext(SubMenuContext);
  const [client, setClient] = useState({ width: 0, height: 0 });
  const [over, setOver] = useState({ x: false, y: false });
  const menuRef = useRef<HTMLDivElement>(null);

  let minusX = client.width - width;
  switch (position) {
    case 'center':
    case 'top-center':
    case 'bottom-center':
      minusX = minusX / 2;
      break;

    case 'right':
    case 'top-right':
    case 'bottom-right':
      minusX = 0;
      break;
  }

  let minusY = 0;
  switch (position) {
    case 'top-left':
    case 'top-center':
    case 'top-right':
      minusY = client.height;
      break;
    case 'bottom-left':
    case 'bottom-center':
    case 'bottom-right':
      minusY = -height;
      break;
  }

  const onClickOutSide: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  useLayoutEffect(() => {
    if (menuRef.current) {
      const { clientWidth, clientHeight } = menuRef.current;
      setClient({ width: clientWidth, height: clientHeight });
    }
  }, [setClient]);

  useLayoutEffect(() => {
    if (target && client.height !== 0) {
      const { x, y, width, height } = target.getBoundingClientRect();
      const overHeight = viewHeight < y + client.height;
      setOver((prev) => ({ ...prev, y: overHeight ? true : false }));
      dispatchMenu({
        type: 'setPosition',
        payload: {
          x,
          y: overHeight
            ? y + window.scrollY - client.height + width
            : y + window.scrollY,
          width,
          height,
        },
      });
    }
  }, [viewWidth, viewHeight, dispatchMenu, target, client.height]);

  return (
    <div className={cx(styles.background)}>
      <div
        className={cx(utils.fixed, utils.t_r_b_l_0)}
        onClick={onClickOutSide}
      ></div>
      <div className={utils.relative}>
        <div
          className={cx(
            styles.context_menu,
            utils.absolute,
            over.y ? utils.fadeIn : utils.maxHeight,
            nav && styles.nav
          )}
          style={{
            top: y - minusY,
            left: x - minusX,
          }}
        >
          <div className={utils.relative}>
            <div
              ref={menuRef}
              className={cx(
                direction === 'row' ? utils.d_flexRow : utils.d_flexColumn,
                className
              )}
              style={style}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
